import SlackBot from "slackbots";
import Slack from "slack-node";

import { commands } from "../commands/commands";
import { ICommandParams, IEventParams, CALLSIGN } from "../misc/globals";

/**
 * respond to a message event
 * @param params event params
 */
export function onMessage(params : IEventParams) : void {
    if(params.data.subtype == "bot_message") return;
    
    let text : string = params.data.text;

    if(text[0] != CALLSIGN) return;

    let messageTokens : string[] = text.slice(1, text.length).split(" ");
    console.log(messageTokens);
    if(commands[messageTokens[0].toLowerCase()]) {

        commands[messageTokens[0].toLowerCase()].process(params);

    }
}