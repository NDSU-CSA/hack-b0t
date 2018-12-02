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
    if(data.type != "error") {
        console.log(data);
    }

    if(data.type == "message") {
        let params : IMessageEventParams = {
            message: data, 
            bot: bot, 
            slack: slack,
            user: user,
            userToken : userToken
        }

        onMessage(params);
    }
    if(data.type == "hello") {
        console.log("hack-b0t is ready.");
    }
});