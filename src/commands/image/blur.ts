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

    let blurAmt : number = 5;
    if(params.message.text.split(" ").length >= 2) {
        let amt : string = params.message.text.split(" ")[1];
        if(!parseInt(amt) || parseInt(amt) < 0) {
            params.bot.postMessage(params.message.channel, "Invalid blur amount");
            return;
        } else {
            blurAmt = parseInt(amt);
        }
    }

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