"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";
import fs from "fs";
import Jimp from "jimp";
import http from 'http';

import { ICommandParams, CALLSIGN } from "../misc/globals";
import { uploadImage } from "../api/uploadFile";

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
            const filename : string = "./res/img/test_small.png";

            uploadImage(params.slack, filename, params.data.channel);
        }
    },
    "invert": {
        name: "invert",
        description: "Inverts the colors of the most recent sent image",
        category: "fun",
        usage: "invert",
        admin: false,
        process: (params: ICommandParams) : void  => {

            params.user.api("files.list", {
                channel: params.data.channel,
                types: "images",
                count: 1
            }, (err : any, response : any) : void => {

                if(err) console.log(err);
                
                let temp : string = `./res/dynamic_img/${(Math.random() * 5000) + 1000}.png`;
                Jimp.read(response.files[0].url_private)
                .then((image) => {
                    image.invert().write(temp);
                    params.slack.api("files.upload", {
                        filename: `emptybowl`,
                        file: fs.createReadStream(temp),
                        channels: params.data.channel
                    }, (err:any, response:any) : void => {
                        if(err) console.log(err);

                        fs.unlinkSync(temp);
                    });
                });
            });

        }
    },
}