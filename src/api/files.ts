import SlackBot from "slackbots";
import Slack from "slack-node";
import fs from "fs";

export interface IFile {
    id: string,
    created: number,
    timestamp: number,
    name: string,
    title: string,
    mimetype: string,
    filetype: string,
    pretty_type: string,
    user: string,
    editable: boolean,
    size: number,
    mode: string,
    is_external: boolean,
    external_type: string,
    is_public: boolean,
    public_url_shared: boolean,
    display_as_bot: boolean,
    username: string,
    url_private: string,
    url_private_download: string,
    thumb_64: string,
    thumb_80: string,
    thumb_360: string,
    thumb_360_w: number,
    thumb_360_h: number,
    thumb_480: string,
    thumb_480_w: number,
    thumb_480_h: number,
    thumb_160: string,
    image_exif_rotation: number,
    original_w: number,
    original_h: number,
    pjpeg: string,
    permalink: string,
    permalink_public: string,
    has_rich_preview: boolean
}

export interface IFileList {
    ok : string,
    files : IFile[],
    paging : object
}