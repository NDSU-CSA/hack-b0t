import SlackBot from "slackbots";
import Slack from "slack-node";

export const CALLSIGN : string = require("../../res/config/config.json")["callsign"];

export interface IEventParams {
    bot : any,
    data : any,
    slack: Slack,
    apiToken : string
}

export interface ICommandParams {
    bot : any, 
    data : any,
    slack : Slack,
    apiToken : string
}