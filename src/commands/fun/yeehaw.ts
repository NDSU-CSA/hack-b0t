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

    const filename : string = "./res/img/yeehaw-s.gif";

    // upload file to channel of original request
    params.slack.files.upload({
        filename: filename,
        file: fs.createReadStream(filename),
        channels: params.message.channel
    });
}

export const command : Command = new Command({
    name: "yeehaw",
    description: "Yeehaw, partner, yeehaw.",
    category: "fun", 
    usage: "yeehaw",
    admin: false,
    execute : execute
});