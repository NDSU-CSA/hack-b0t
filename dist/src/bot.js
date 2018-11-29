"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var slackbots_1 = __importDefault(require("slackbots"));
var slack_node_1 = __importDefault(require("slack-node"));
var auth = require("../res/auth/auth.json");
var botToken = auth["bot-token"];
var apiToken = auth["api-token"];
var uri = "https://hooks.slack.com/services/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";
var bot = new slackbots_1.default({
    token: botToken,
    name: 'hack-b0t'
});
var slack = new slack_node_1.default(apiToken);
slack.setWebhook(uri);
/**
 * message callback, tests is a message is a message and if it came from a user
 * and not a bot
 */
bot.on("message", function (data) {
    console.log(data);
    // ignore non messages and bot messages
    if (data.type != "message")
        return;
    if (data.subtype == "bot_message")
        return;
    if (data.text[0] == '$') {
        parseCommand(data, data.text);
    }
});
/**
 * gets a users name from a callback data object
 *
 * @param data data from callback
 * @returns promise for name
 */
function getName(data) {
    return new Promise(function (resolve) {
        slack.api("users.info", {
            token: apiToken,
            user: data.user
        }, function (err, response) {
            if (err)
                console.log(err);
            console.log(response);
            var name = "USER";
            name = response.user.profile.display_name;
            if (name == "") {
                name = response.user.profile.real_name;
            }
            resolve(name);
        });
    });
}
/**
 * parses a data structure that has a command call
 * @param data data from message callback
 * @param text test in data
 */
function parseCommand(data, text) {
    getName(data)
        .then(function (name) {
        bot.postMessage(data.channel, name + " : " + data.text.toUpperCase().slice(1, data.text.length));
    });
}
