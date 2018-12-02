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
export function onMessage(params : IMessageEventParams) : void {
    if(params.message.subtype == "bot_message") return;
    if(!params.message.text) return;

    let text : string = params.message.text;

    if(text[0] != CALLSIGN) return;

    let messageTokens : string[] = text.slice(1, text.length).split(" ");
    console.log(messageTokens);
    if(commands[messageTokens[0].toLowerCase()]) {

        commands[messageTokens[0].toLowerCase()].process(params);

    }
}