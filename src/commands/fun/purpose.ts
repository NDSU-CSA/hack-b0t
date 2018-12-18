import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

/**
 * Purpose
 * 
 * Find out hack-b0t's purpose
 * 
 * Category    : fun
 * Admin       : no
 * Chat params : none
 */

async function execute(params: ICommandParams) : Promise<void> {
    params.bot.postMessage(params.message.channel, "1 EX1ST T0 HACK");
}

export const command : Command = new Command({
    name: "purpose",
    description: "Learn hack-b0t's purpose",
    category: "fun",
    usage: "purpose",
    admin: false,
    execute : execute
});