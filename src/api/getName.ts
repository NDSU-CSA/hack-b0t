import SlackBot from "slackbots";
import Slack from "slack-node";

/**
 * gets a users name from a callback data object
 * 
 * @param data data from callback
 * @returns promise for name
 */
export function getName(slack : Slack, data : any, apiToken : string) : Promise<string> {
    return new Promise( (resolve : (name : string) => void) => {
        slack.api("users.info", {
            token: apiToken,
            user: data.user
        }, (err:any, response:any) => {
            if(err) console.log(err);
            console.log(response);
    
            const name : string = response.user.profile.display_name || response.user.profile.real_name;
    
            resolve(name);
        });
    });
}