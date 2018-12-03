"use strict";

import fs from "fs";
import Jimp from "jimp";

import { ICommandParams, CALLSIGN } from "../misc/globals";

import { Duplex } from "stream";

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
        process: async (params: ICommandParams) : Promise<void> => {
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
            params.bot.postMessage(params.message.channel, responseText);
        }
    },
    "ping": {
        name: "ping",
        description: "Pong!",
        category: "fun",
        usage: "ping",
        admin: false,
        process: async (params: ICommandParams) : Promise<void> => {
            if(!params.message.ts) return;

            let offset : number = (new Date).getTime() - (Number(params.message.ts)*1000);
            params.bot.postMessage(params.message.channel, `:table_tennis_paddle_and_ball: Pong! _${Math.floor(offset)} ms_`);
        }
    },
    "purpose": {
        name: "purpose",
        description: "Learn hack-b0t's purpose",
        category: "fun",
        usage: "purpose",
        admin: false,
        process: async (params: ICommandParams) : Promise<void> => {
            params.bot.postMessage(params.message.channel, "1 EX1ST T0 HACK");
        }
    },
    "anime": {
        name: "anime",
        description: "Image testing command",
        category: "fun", 
        usage: "anime",
        admin: false,
        process: async (params: ICommandParams) : Promise<void> => {
            if(!params.message.channel) return;

            const filename : string = "./res/img/test_small.png";

            params.slack.files.upload({
                filename: filename,
                file: fs.createReadStream(filename),
                channels: params.message.channel
            });
        }
    },
    "invert": {
        name: "invert",
        description: "Inverts the colors of the most recent sent image",
        category: "image",
        usage: "invert",
        admin: false,
        process: async (params: ICommandParams) : Promise<void> => {

            let start = Date.now();

            params.user.files.list({
                channel: params.message.channel,
                types: "images",
                count: 1
            })
            .then((response : any) => {
                let downloadParams : any = {
                    url: response.files[0].url_private,
                    headers: {
                        "Authorization" : `Bearer ${params.userToken}`
                    }
                };
                return Jimp.read(downloadParams);
            })
            .then((image : Jimp) => image.invert().getBufferAsync(Jimp.MIME_JPEG))
            .then((buffer : Buffer) => {
                let stream : Duplex = new Duplex();
                stream.push(buffer);
                stream.push(null);

                return params.slack.files.upload({
                    filename: `${Math.floor(Math.random() * 5000) + 1000}`,
                    file: stream,
                    channels: params.message.channel,
                    initial_comment : `${Date.now() - start} ms`
                });
            })
            .catch((err : Error) => {
                console.log(err);
                params.bot.postMessage(params.message.channel, "Unable to invert image");
            });
        }
    },
    "blur": {
        name: "blur",
        description: "blur the most recent sent image by a given amount",
        category: "image",
        usage: "blur [amt, default 5]",
        admin: false,
        process: async (params: ICommandParams) : Promise<void> => {
            if(!params.message.text) return;

            let blurAmt : number = 5;
            if(params.message.text.split(" ").length >= 2) {
                let amt : string = params.message.text.split(" ")[1];
                if(!parseInt(amt)) {
                    params.bot.postMessage(params.message.channel, "Invalid blur amount");
                    return;
                } else {
                    blurAmt = parseInt(amt);
                }
            }

            let start = Date.now();

            params.user.files.list({
                channel: params.message.channel,
                types: "images",
                count: 1
            })
            .then((response : any) => {
                let downloadParams : any = {
                    url: response.files[0].url_private,
                    headers: {
                        "Authorization" : `Bearer ${params.userToken}`
                    }
                };
                return Jimp.read(downloadParams);
            })
            .then((image : Jimp) => image.blur(blurAmt).getBufferAsync(Jimp.MIME_JPEG))
            .then((buffer : Buffer) => {
                let stream : Duplex = new Duplex();
                stream.push(buffer);
                stream.push(null);

                return params.slack.files.upload({
                    filename: `${Math.floor(Math.random() * 5000) + 1000}`,
                    file: stream,
                    channels: params.message.channel,
                    initial_comment : `${Date.now() - start} ms`
                });
            })
            .catch((err : Error) => {
                console.log(err);
                params.bot.postMessage(params.message.channel, "Unable to blur image");
            });
        }
    },
}