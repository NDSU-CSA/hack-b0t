"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";

import { ICommandParams } from "./misc/globals";

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
        usage: "$help",
        admin: false,
        process: (params: ICommandParams) => {
            params.bot.postMessage(params.data.channel, "just ask jack lol");
        }
    },
    "ping": {
        name: "ping",
        description: "Pong!",
        category: "fun",
        usage: "$ping",
        admin: false,
        process: (params: ICommandParams) => {
            params.bot.postMessage(params.data.channel, "Pong!");
        }
    },
    "purpose": {
        name: "purpose",
        description: "Lean hack-b0t's purpose",
        category: "fun",
        usage: "$purpose",
        admin: false,
        process: (params: ICommandParams) => {
            params.bot.postMessage(params.data.channel, "1 EX1ST T0 HACK");
        }
    }
}