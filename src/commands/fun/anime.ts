import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

import fs from "fs";

/**
 * Anime
 * 
 * Sends a picture of anime
 * 
 * Category    : fun
 * Admin       : no
 * Chat params : none
 */

async function execute(params: ICommandParams) : Promise<void> {
    // ignore messages without a channel
    if(!params.message.channel) return;

    const filename : string = "./res/img/test_small.png";

    // upload file to channel of original request
    params.slack.files.upload({
        filename: filename,
        file: fs.createReadStream(filename),
        channels: params.message.channel
    });
}

export const command : Command = new Command({
    name: "anime",
    description: "Image testing command",
    category: "fun", 
    usage: "anime",
    admin: false,
    execute : execute
});