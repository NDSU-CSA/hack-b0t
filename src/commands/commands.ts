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

// export commands
export { commands };
