"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";
import fs from "fs";

import { ICommandParams, CALLSIGN } from "../misc/globals";

export interface ICommand {
    name: string;
    description: string;
    category: string;
    usage: string;
    admin: boolean;
    process(params: ICommandParams): any;
}

export const commands : {[key: string] : ICommand} = {
    "help": {
        name: "help",
        description: "Displays a help page",
        category: "utility",
        usage: "help",
        admin: false,
        process: (params: ICommandParams) : void => {
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
            params.bot.postMessage(params.data.channel, responseText);
        }
    },
    "ping": {
        name: "ping",
        description: "Pong!",
        category: "fun",
        usage: "ping",
        admin: false,
        process: (params: ICommandParams) : void  => {
            params.bot.postMessage(params.data.channel, "Pong!");
        }
    },
    "pong": {
        name: "pong",
        description: "Ping!",
        category: "fun",
        usage: "pong",
        admin: false,
        process: (params: ICommandParams) : void  => {
            params.bot.postMessage(params.data.channel, "WRONG WRONG WRONG WRONG");
        }
    },
    "purpose": {
        name: "purpose",
        description: "Learn hack-b0t's purpose",
        category: "fun",
        usage: "purpose",
        admin: false,
        process: (params: ICommandParams) : void  => {
            params.bot.postMessage(params.data.channel, "1 EX1ST T0 HACK");
        }
    },
    "anime": {
        name: "anime",
        description: "Image testing command",
        category: "fun",
        usage: "anime",
        admin: false,
        process: (params: ICommandParams) : void  => {
            const filename : string = "./res/img/test.png";
            params.slack.api("chat.postMessage", {
                file: fs.readFileSync(filename),
                text: "message content",
                channel: params.data.channel
            }, (err: any, response:any) : void => {
                if(err) console.log(err);
                console.log(response);
            });
        }
    }
}