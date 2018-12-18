import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

/**
 * Help
 * 
 * Displays a help page about other commands
 * 
 * Category    : utility
 * Admin       : no
 * Chat params : none
 */

async function execute(params: ICommandParams) : Promise<void> {
    params.bot.postMessage(params.message.channel, "Take a look at my source code:\nhttps://github.com/NDSU-CSA/hack-b0t");
}

export const command : Command = new Command({
    name: "source",
    description: "Sends hack-b0t's Github repository",
    category: "utility",
    usage: "source",
    admin: false,
    execute : execute
});