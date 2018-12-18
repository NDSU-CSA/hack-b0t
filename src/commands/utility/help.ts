import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

import { commands } from "../commands";
import { CALLSIGN } from "../../misc/globals";

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
    let responseText = "```\n";
    // find longest command name
    let longestCmd : number = 0;
    for(let cmd in commands) {
        if(cmd.length > longestCmd) {
            longestCmd = cmd.length;
        }
    }
    // add correct number of tacs
    for(let cmd in commands) {
        responseText += cmd + " ";
        for(let i : number = cmd.length; i < longestCmd + 2; i++) {
            responseText += "-";
        }
        responseText += ` ${commands[cmd].description}\n`;
    }

    responseText += `Usage: ${CALLSIGN}command [params]\n`
    responseText += "```";
    

    params.bot.postMessage(params.message.channel, responseText);
}

export const command : Command = new Command({
    name: "help",
    description: "Displays a help page",
    category: "utility",
    usage: "help",
    admin: false,
    execute : execute
});