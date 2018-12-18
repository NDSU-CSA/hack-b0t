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
    .then((image : Jimp) => image.invert().getBufferAsync(Jimp.MIME_JPEG))
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
        params.bot.postMessage(params.message.channel, "Unable to invert image");
    });
}

export const command : Command = new Command({
    name: "invert",
    description: "Inverts the colors of the most recent sent image",
    category: "image",
    usage: "invert",
    admin: false,
    execute : execute
});