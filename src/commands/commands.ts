"use strict";

import SlackBot from "slackbots";
import Slack from "slack-node";
import fs from "fs";
import Jimp from "jimp";

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
    "magik": {
        name: "magik",
        description: "Image edit test command",
        category: "fun",
        usage: "magik",
        admin: false,
        process: (params: ICommandParams) : void  => {
            const filename : string = "./res/img/test_small.png";
            
            let outFile : string = `./res/dynamic_img/${(Math.random() * 5000) + 1000}.png`;

            Jimp.loadFont(Jimp.FONT_SANS_128_WHITE).then((font : any) => {
                console.log("FONT LOADED...");
                Jimp.read(filename)
                .then(image => {
                    console.log("FILE READ...");
                    image
                        .invert()
                        .print(
                            font, 
                            0, 
                            0, 
                            {
                                text: "HACK-B0T",
                                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
                            },
                            image.getWidth(),
                            image.getHeight())
                        .write(outFile);
                    console.log("EDITING DONE...");
                    
                    uploadImage(params.slack, outFile, params.data.channel);
                });
            });
        }
    },
}