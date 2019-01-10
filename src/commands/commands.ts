"use strict";

import fs from "fs";

import { ICommandParams } from "../misc/globals";

import { Command } from "./command";

/**
 * 
 * Used to grab commands from file structure and prevent from having to manually
 * add new commands to a list somewhere
 * 
 * To add a new command to the bot, use the Command structure described in
 * `command.ts` and drop it into one of the listed categories (if the command
 * falls under a new category, create the folder and add the category to the 
 * list below) 
 * 
 */

// our categories to search for commands in
let categories : string[] = [
    "fun",
    "image",
    "utility"
];

export interface ICommand {
    name: string;
    description: string;
    category: string;
    usage: string;
    admin: boolean;
    process(params: ICommandParams): any;
}

/**
 * grabCommands
 * give a list of command categories, it iterates through the file structure
 * and adds any discovered commands to the path, if a file does not follow
 * the Command format then it is ignored
 * 
 * @param categories a list of string specifying category names
 * @returns an object consisting of command names and their Command counterpart
 * 
 */
function grabCommands(categories : string[]) : {[key : string] : Command} {
    // command list
    let commands : {[key : string] : Command} = {};

    // iterate through folders and load commands
    for(let i in categories) {
        // get path to folder
        let path : string = `${__dirname}/${categories[i]}`;
        // list files in folder
        fs.readdir(path, (err : Error, files : string[]) => {
            // iterate through files and test if they follow command format
            files.forEach((file : string) => {
                let cmd = require(path + "/" + file);
                // if command format is found, log to console and add to command
                // list
                // TODO: add logging wrapper for easier error handling
                if(cmd.command) {
                    commands[cmd.command.name] = cmd.command;
                    console.log(`Found command ${cmd.command.name}`);
                }
            });

        });
    }

    return commands;
}

// grab and export commands
let commands : {[key : string] : Command} = grabCommands(categories);
export { commands };
