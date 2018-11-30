import SlackBot from "slackbots";
import Slack from "slack-node";
import fs from "fs";

export function uploadImage(slack : Slack, filename: string, channel : string) {
    return new Promise( (resolve : (err : any, response : any) => void) => {
        slack.api("files.upload", {
            filename: filename,
            file: fs.createReadStream(filename),
            channels: channel
        }, (err:any, response:any) : void => {
            resolve(err, response);
        });
    });
}