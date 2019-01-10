
import { ICommandParams } from "../misc/globals";

/**
 * The ICommand Interface is used to define the layout of commands,
 * each command requires the following attributes:
 * - a name
 *   - while the name of the file is used for command execution, it is in best
 *     practice to make the command name and file name the same
 * - a description
 *   - basic description of what the command does, this should include what 
 *     different parameters should do if required
 * - a category
 *   - the current categories are fun, image, and utility, but more can be added
 *     if a need is found
 * - a usage description
 *   - callsign is _not_ included, as the callsign can be changed in the config
 *     file
 *   - a basic usage description should be formatted as follows:
 *      
 *     ping
 *     help [command name]
 *     add [number] [number]
 * - a boolean admin flag
 *   - if set to true, only server admins will be allowed to use the specified
 *     command
 */

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