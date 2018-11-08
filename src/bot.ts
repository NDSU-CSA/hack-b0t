import { WebClient, WebAPICallResult } from "@slack/client";
import fs from "fs";

const auth = require("../res/auth/auth.json");

const token : string = auth["token"];

const web : WebClient = new WebClient(token);

const conversationID : string = "CDZ8BJ7C2";

console.log("USING TOKEN   ", token);
console.log("POSTING CONVO ", conversationID);

const main = function() {

}

web.chat.postMessage({
    channel: conversationID,
    text: "1 AM AL1V3" 
    })
    .then((res) => {
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