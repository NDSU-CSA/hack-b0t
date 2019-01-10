import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

import Jimp from "jimp";
import { Duplex } from "stream";

/**
 * Invert
 * 
 * Inverts the last sent image's colors
 * 
 * Category    : image
 * Admin       : no
 * Chat params : none
 */

async function execute(params: ICommandParams) : Promise<void> {
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
    // once we have the image, we do our editing (in this case only inverting), 
    // and then grab the data as a buffer as a jpg file
    .then((image : Jimp) => image.invert().getBufferAsync(Jimp.MIME_JPEG))
    // we then upload our buffer to the specified slack channel
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
        params.bot.postMessage(params.message.channel, "Unable to invert image");
    });
}

// export our command structure with the accompanied command information
export const command : Command = new Command({
    name: "invert",
    description: "Inverts the colors of the most recent sent image",
    category: "image",
    usage: "invert",
    admin: false,
    execute : execute
});