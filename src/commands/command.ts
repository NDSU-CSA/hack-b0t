
import { ICommandParams } from "../misc/globals";

export interface ICommand {
    readonly name: string;
    readonly description: string;
    readonly category: string;
    readonly usage: string;
    readonly admin: boolean;
    execute(params: ICommandParams): Promise<any>;
}

export class Command implements ICommand {
    name: string;
    description: string;
    category: string;
    usage: string;
    admin: boolean;
    execute : (params : ICommandParams) => Promise<void>;

    constructor(command : ICommand) {
        this.name = command.name;
        this.description = command.description;
        this.category = command.category;
        this.usage = command.usage;
        this.admin = command.admin;

        this.execute = command.execute;
    }
}