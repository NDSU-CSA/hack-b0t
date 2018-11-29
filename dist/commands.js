"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = {
    "help": {
        name: "help",
        description: "Displays a help page",
        category: "utility",
        usage: "$help",
        admin: false,
        process: function (params) {
            params.bot.postMessage(params.data.channel, "just ask jack lol");
        }
    },
    "ping": {
        name: "ping",
        description: "Pong!",
        category: "fun",
        usage: "$ping",
        admin: false,
        process: function (params) {
            params.bot.postMessage(params.data.channel, "Pong!");
        }
    },
    "purpose": {
        name: "purpose",
        description: "Lean hack-b0t's purpose",
        category: "fun",
        usage: "$purpose",
        admin: false,
        process: function (params) {
            params.bot.postMessage(params.data.channel, "1 EX1ST T0 HACK");
        }
    }
};
