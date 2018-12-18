
import { IFile } from "./files";

export interface IMessage {
    type : "message",
    subtype? : string, 
    user? : string,
    text? : string, 
    client_msg_id? : string,
    team? : string,
    channel? : string,
    event_ts? : string,
    ts? : string,
    files? : IFile[],
    upload? : boolean,
    display_as_bot? : boolean,
    bot_id? : string,
    channel_type? : string,
    username? : string,
    icons? : object,
    inviter? : string,
    old_name? : string,
    name? : string,
    purpose? : string,
    topic? : string,
    file? : IFile,
    comment? : object,
    members? : string[]
    hidden? : boolean,
    message? : IMessage,
    edited? : IMessageEdit,
    deleted_ts? : string,
    reply_count? : number,
    replies? : IMessageReply[],
    item? : object,
    item_type? : string,
    root? : IMessage,
    unread_count? : number
}

export interface IMessageEdit {
    user: string,
    ts: string
}

export interface IMessageReply {
    user : string,
    ts : string
}