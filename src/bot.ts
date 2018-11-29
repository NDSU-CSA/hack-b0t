"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";

import { commands } from "./commands";
import { ICommandParams } from "./misc/globals";

const auth = require("../res/auth/auth.json");

const botToken : string = auth["bot-token"];
const apiToken : string = auth["api-token"];

const uri : string = "https://hooks.slack.com/services/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";

let bot : any = new SlackBot({
    token: botToken,
    name: 'hack-b0t'
});

let slack : Slack = new Slack(apiToken);
slack.setWebhook(uri);

/**
 * message callback, tests is a message is a message and if it came from a user
 * and not a bot
 */
bot.on("message", (data:any) => {
    console.log(data);

    // ignore non messages and bot messages
    if(data.type != "message") return;
    if(data.subtype == "bot_message") return;

    if(data.text[0] == '$') {
        parseCommand(data, data.text);
    }
});

/**
 * gets a users name from a callback data object
 * 
 * @param data data from callback
 * @returns promise for name
 */
function getName(data:any) {
    return new Promise( (resolve : (name : string) => void) => {
        slack.api("users.info", {
            token: apiToken,
            user: data.user
        }, (err:any, response:any) => {
            if(err) console.log(err);
            console.log(response);
    
            let name : string = "USER";
    
            name = response.user.profile.display_name;
    
            if(name == "") {
                name = response.user.profile.real_name;
            }
    
            resolve(name);
        });
    });
}

/**
 * parses a data structure that has a command call
 * @param data data from message callback
 * @param text test in data 
 */
function parseCommand(data:any, text:string) {
    let messageTokens : string[] = text.slice(1, text.length).split(" ");
    console.log(messageTokens);
    if(commands[messageTokens[0].toLowerCase()]) {

        const params: ICommandParams = {
            bot: bot,
            data: data
        };

        commands[messageTokens[0].toLowerCase()].process(params);
    }
}