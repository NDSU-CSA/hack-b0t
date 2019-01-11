import SlackBot from "slackbots";
import { WebClient } from "@slack/client";

import { commands } from "../commands/commands";
import { CALLSIGN } from "../misc/globals";
import { IMessage } from "../api/messages";

export interface IMessageEventParams {
    bot : any,
    message : IMessage,
    slack: WebClient,
    user : WebClient,
    userToken: string
}

/**
 * respond to a message event
 * @param params event params
 */
export async function onMessage(params : IMessageEventParams) : Promise<void> {
    // dont respond to bot messages or messages without text
    if(params.message.subtype == "bot_message") return;
    if(!params.message.text) return;

    let text : string = params.message.text;

    // if the message does not contain the callsign then ignore the message
    if(text[0] != CALLSIGN) return;

    // grab the command, if it exists in the command map then pass it along with
    // params to the correct command file
    let messageTokens : string[] = text.slice(1, text.length).split(" ");
    console.log(messageTokens);
    if(commands[messageTokens[0].toLowerCase()]) {

        return commands[messageTokens[0].toLowerCase()].execute(params);

    }
}