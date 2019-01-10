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
    // satisfy typescript, ignore messages without a timestamp
    if(!params.message.ts) return;

    // slack message timestamps are in miliseconds, where our time is in 
    // microseconds, multiply by 1000 to convert slack timestamp 
    let messageTs : number = Number(params.message.ts)*1000;
    let offset : number = (new Date).getTime() - messageTs;
    
    params.bot.postMessage(
        params.message.channel, 
        `:table_tennis_paddle_and_ball: Pong! _${Math.floor(offset)} ms_`
    );
}

export const command : Command = new Command({
    name : "ping",
    description :  "Pong!",
    category :  "fun",
    usage :  "ping",
    admin : false,
    execute : execute
});