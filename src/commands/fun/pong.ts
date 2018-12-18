import { Command } from "../command";
import { ICommandParams } from "../../misc/globals";

/**
 * Ping
 * 
 * Responds with the text "Pong!" and the amount of time it took to respond
 * 
 * Category    : fun
 * Admin       : no
 * Chat params : none
 */

async function execute(params : ICommandParams) : Promise<void> {
    if(!params.message.ts) return;

    let messageTs : number = Number(params.message.ts)*1000;
    let offset : number = (new Date).getTime() - messageTs;
    params.bot.postMessage(
        params.message.channel, 
        `:table_tennis_paddle_and_ball: Ping! _${Math.floor(offset)} ms_`
    );
}

export const command : Command = new Command({
    name : "pong",
    description :  "Ping!",
    category :  "fun",
    usage :  "pong",
    admin : false,
    execute : execute
});