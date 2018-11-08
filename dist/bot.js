"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@slack/client");
var auth = require("../res/auth/auth.json");
var token = auth["token"];
var web = new client_1.WebClient(token);
var conversationID = "CDZ8BJ7C2";
console.log("USING TOKEN   ", token);
console.log("POSTING CONVO ", conversationID);
var main = function () {
};
web.chat.postMessage({
    channel: conversationID,
    text: "1 AM AL1V3"
})
    .then(function (res) {
    console.log("Message sent : ", res);
})
    .catch(console.error);
/*
const filename = "res/img/test.png";

web.files.upload({
    filename,
    file: fs.createReadStream(filename),
    channels: conversationID
    })
    .then((res : WebAPICallResult) => {
        console.log("Uploaded: ", res);
    })
    .catch(console.error);
*/ 
