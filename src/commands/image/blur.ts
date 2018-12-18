import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

import Jimp from "jimp";
import { Duplex } from "stream";

import R from "ramda";

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

    const send = (params : ICommandParams, message : string) : void => params.bot.sendMessage(params.message.channel, message);

    const isBlurValid = (blur : any) => [
        (num : any) => !isNaN(num),
        (num : any) => num > 0
    ].every(f => f(Number(blur)));

    const words = params.message.text.split(" ");
    const [, blurInput] = words;

    if(words.length >= 2 && !isBlurValid(blurInput)) {
        return send(params, "Invalid Blur Amount");
    }

    const blurAmt = Number(blurInput) || 5;

    let start = Date.now();

    params.user.files.list({
        channel: params.message.channel,
        types: "images",
        count: 1
    })
    .then((response : any) => {
        let downloadParams : any = {
            url: response.files[0].url_private,
            headers: {
                "Authorization" : `Bearer ${params.userToken}`
            }
        };
        return Jimp.read(downloadParams);
    })
    .then((image : Jimp) => image.blur(blurAmt).getBufferAsync(Jimp.MIME_JPEG))
    .then((buffer : Buffer) => {
        let stream : Duplex = new Duplex();
        stream.push(buffer);
        stream.push(null);

        return params.slack.files.upload({
            filename: `${Math.floor(Math.random() * 5000) + 1000}`,
            file: stream,
            channels: params.message.channel,
            initial_comment : `${Date.now() - start} ms`
        });
    })
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