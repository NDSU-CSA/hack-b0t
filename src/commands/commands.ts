"use strict";

import fs from "fs";

import { ICommandParams } from "../misc/globals";

import { Command } from "./command";


export interface ICommand {
    name: string;
    description: string;
    category: string;
    usage: string;
    admin: boolean;
    process(params: ICommandParams): any;
}

// folder categories
let categories : string[] = [
    "fun",
    "image",
    "utility"
];

// command list
let commands : {[key : string] : Command} = {};


// iterate through folders and load commands
for(let i in categories) {
    let path : string = `${__dirname}/${categories[i]}`;
    fs.readdir(path, (err : Error, files : string[]) => {

        files.forEach((file : string) => {
            let cmd = require(path + "/" + file);
            if(cmd.command) {
                commands[cmd.command.name] = cmd.command;
                console.log(`Found command ${cmd.command.name}`);
            }
        });

    });
}

<<<<<<< HEAD
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
=======
// export commands
export { commands };
>>>>>>> 719772e5289e6c3ed40e16b67870a814093b0db8
