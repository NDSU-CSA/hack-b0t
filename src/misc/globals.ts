import SlackBot from "slackbots";
import { WebClient } from "@slack/client";

import { IMessage } from "../api/messages";

export const CALLSIGN : string = require("../../res/config/config.json")["callsign"];

export interface IEventParams {
    bot : any,
    data : any,
    slack: WebClient,
    user : WebClient,
    userToken: string
}

export interface ICommandParams {
    bot : any, 
    message : IMessage,
    slack : WebClient,
    user : WebClient,
    userToken: string
}