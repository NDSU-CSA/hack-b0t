"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";

import { IEventParams } from "./misc/globals";
import { onMessage } from "./handlers/onMessage";

const auth = require("../res/auth/auth.json");

const botToken : string = auth["bot-token"];
const apiToken : string = auth["api-token"];
const webhookUri : string = auth["webhook"];

let bot : any = new SlackBot({
    token: botToken,
    name: 'hack-b0t'
});

let slack : Slack = new Slack(botToken);
slack.setWebhook(webhookUri);

/**
 * Even though it says message, this handler catches literally everything, 
 * because of this we need to filter items before sending them to the right
 * handler
 * 
 * thanks slackbots
 */
bot.on("message", (data:any) => {
    console.log(data);

    let params : IEventParams = {
        data: data, 
        bot: bot, 
        slack: slack,
        apiToken: apiToken
    };

    if(data.type == "message") {
        onMessage(params);
    }
});