"use strict";

import SlackBot from "slackbots";
import { WebClient } from "@slack/client";

import { IEventParams } from "./misc/globals";
import { onMessage, IMessageEventParams } from "./handlers/onMessage";

const auth = require("../res/auth/auth.json");

const botToken : string = auth["bot-token"];
const userToken : string = auth["user-token"];

let bot : any = new SlackBot({
    token: botToken,
    name: 'hack-b0t'
});

let slack : WebClient = new WebClient(botToken);
let user : WebClient = new WebClient(userToken); 

/**
 * Even though it says message, this handler catches literally everything, 
 * because of this we need to filter items before sending them to the right
 * handler
 * 
 * thanks slackbots
 */
bot.on("message", (data : any) => {
    // catches error events, currently just logs error
    // TODO: external file logging
    if(data.type != "error") {
        console.log(data);
    }

    // catches message events, creates a param structure and sends it to 
    // external handler
    if(data.type == "message") {
        let params : IMessageEventParams = {
            message: data,        // message data
            bot: bot,             // our bot
            slack: slack,         // our slack api client
            user: user,           // our user api client
            userToken : userToken // token for user api client
        }

        onMessage(params); // send to message handler
    }

    // catches online events, first sent when bot comes online and when the bot
    // reconnects after a disconnection from slack service
    if(data.type == "hello") {
        console.log("hack-b0t is ready.");
    }
});