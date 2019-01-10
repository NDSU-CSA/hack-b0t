import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

import Jimp from "jimp";
import { Duplex } from "stream";

/**
 * Blur
 * 
 * Blurs the last sent image by a given amount (default 5)
 * 
 * Category    : image
 * Admin       : no
 * Chat params : [blur amount]
 */

async function execute(params: ICommandParams) : Promise<void> {
    if(!params.message.text) return;

    // simple send command
    const send = (params : ICommandParams, message : string) : void => params.bot.sendMessage(params.message.channel, message);

    // function to check if the blur amount is a number and above 0
    const isBlurValid = (blur : any) => [
        (num : any) => !isNaN(num),
        (num : any) => num > 0
    ].every(f => f(Number(blur)));

    // split command into words
    const words = params.message.text.split(" ");
    // grab the second element in word array
    const [, blurInput] = words;

    // if the amount of words in the command is more than 2 or the blur amount 
    // is not valid, tell user blur amount is not valid
    if(words.length >= 2 && !isBlurValid(blurInput)) {
        return send(params, "Invalid Blur Amount");
    }

    // if the blurInput is less than 0 default to 5
    const blurAmt = Number(blurInput) || 5;

    // used for execution timing
    let start = Date.now();

    // fetch images from the channel with a count of one, in theory this should
    // grab the most recent image, but there is currently a delay for the most
    // recently sent image appearing here
    // TODO: look further into slack api file list requests
    params.user.files.list({
        channel: params.message.channel,
        types: "images",
        count: 1
    })
    // once we have our images, we grab the private url and add an authorization
    // header to allow us to download the image from slack
    //
    // this is then passed to Jimp for editing
    .then((response : any) => {
        let downloadParams : any = {
            url: response.files[0].url_private,
            headers: {
                "Authorization" : `Bearer ${params.userToken}`
            }
        };
        return Jimp.read(downloadParams);
    })
    // once we have the image, we do our editing (in this we blur by given 
    // amount), and then grab the data as a buffer as a jpg file
    .then((image : Jimp) => image.blur(blurAmt).getBufferAsync(Jimp.MIME_JPEG))
    // upload buffer to the specified slack channel
    .then((buffer : Buffer) => {
        let stream : Duplex = new Duplex();
        stream.push(buffer);
        stream.push(null);

        return params.slack.files.upload({
            // use random file names for simplicity
            filename: `${Math.floor(Math.random() * 5000) + 1000}`,
            file: stream,
            channels: params.message.channel,
            // attach processing time for debug purposes
            initial_comment : `${Date.now() - start} ms`
        });
    })
    // any errors and the bot will respond with an error message
    // TODO: more descriptive error messages
    .catch((err : Error) => {
        console.log(err);
        params.bot.postMessage(params.message.channel, "Unable to blur image");
    });
}

export const command : Command = new Command({
    name: "blur",
    description: "blur the most recent sent image by a given amount",
    category: "image",
    usage: "blur [amt, default 5]",
    admin: false,
    execute : execute
});