/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import {commandTypes} from '../common/commandTypes';
import {strings} from '../constants/strings';
import {Settings} from '../settings/settings';
import {Command, ICommand} from './command';
import SimilarManager from "./similarManager";
import {IPercentMatch} from "./percentMatch";

class CommandManager {
    private readonly _commands: Command[];
    private readonly _pullCommands: Command[];
    private readonly _settings: Settings;
    private readonly _similarManager: SimilarManager;
    private _isWaitingForSelect: boolean;

    constructor(commands, coreCommands, settings) {
        this._commands = [];
        this._pullCommands = [];
        this._settings = settings;
        this._similarManager = new SimilarManager(this, settings);
        this._isWaitingForSelect = false

        this.parseCommands(commands, coreCommands);
    }

    private get isWaitingForSelect(): boolean {
        return this._isWaitingForSelect
    }

    private set isWaitingForSelect(val) {
        this._isWaitingForSelect = val
    }

    private get lastCommand(): Command {
        return this._pullCommands[this._pullCommands.length - 1]
    }

    private getCommand(id) {
        return this.commands.find((_): boolean => {
            return _.id === id;
        });
    }

    get similarManager(): SimilarManager {
        return this._similarManager
    }


    private parseCommands(commands, coreCommands): void {
        try {
            const isNotExist = (command: Command): boolean => {
                return (
                    this.getCommand(command.id) === undefined
                );
            };

            const add = (command: Command): void => {
                if (isNotExist(command)) {
                    this._commands.push(command);
                }
            };

            const prepareCommand = (elem): void => {
                if (typeof elem.listTexts === 'string') {
                    elem.listTexts = [elem.listTexts];
                } else if (elem.listTexts === undefined) {
                    elem.listTexts = [];
                }

                add(new Command(elem));
            };

            coreCommands.forEach((elem): void => {
                prepareCommand(elem);
            });

            commands.forEach((elem): void => {
                prepareCommand(elem);
            });
        } catch (e) {
            console.error('The commands file not parsed!');
            console.error(e);
            throw e;
        }
    }

    /**
     * The global methods
     */
    public get commands(): Command[] {
        return this._commands;
    }

    public parseCommandsToText(commands?: Command[]): string {
        let text = '<br/>';

        const parse = (list: Command[]): void => {
            list.forEach((command, idx): void => {
                if (command.type !== commandTypes.SYSTEM) {
                    text += `${idx + 1}) "${command.listTexts[0]}".`;

                    if (command.description !== undefined) {
                        text += `<br/> ${command.description}`;
                    }

                    text += '<br/>';
                }
            });
        };

        if (commands) {
            parse(commands);
        } else {
            text = 'Список доступных команд: <br/>';
            parse(this._commands);
        }

        return text;
    }

    public run(name: string): void {
        try {
            const command = this.getCommand(name);
            console.log(command);
            command.func();
        } catch (e) {
            console.error('Command: ' + name);
            console.error(strings.COMMAND_NOT_EXECUTED);
            console.error(e);
        }
    }

    public selectMatchCommand(num: number): IPercentMatch {
        if (num > 0 && num <= this._similarManager.matches.length)
            return this._similarManager.matches[num - 1]

        return null
    }

    public parseCommand(msg: string): void {
        try {
            const num = +/\d+/.exec(msg)

            if (this.isWaitingForSelect && num > 0) {
                this.lastCommand.func(this.lastCommand.userText, this.selectMatchCommand(num).obj)
                this.isWaitingForSelect = false
            } else {
                const isValidMessage = msg.length >= this._settings.minMessageSize;
                const emptyCommand = this.getCommand(this._settings.notFoundCommandId)
                let resCommand: ICommand = emptyCommand

                if (isValidMessage) {
                    resCommand = this.parseTextToCommand(msg, emptyCommand)
                    resCommand.userText = msg

                    if (resCommand.type !== commandTypes.SYSTEM)
                        this._pullCommands.push(new Command(resCommand));
                } else
                    resCommand = emptyCommand

                resCommand.func(msg);
            }
        } catch (e) {
            console.error('Command not parsed!');
            console.error(e);
        }
    }

    public parseTextToCommand(msg: string, emptyCommand: ICommand): ICommand {
        const fieldName = 'listTexts'
        const listPercentMatches: IPercentMatch[] = this._similarManager.similarList(msg, this._commands, fieldName)
        const command = listPercentMatches.find(_ => _.isMax).obj

        if (command.matchPercent > 0 && this._similarManager.isContainMatches(command.matchPercent, listPercentMatches, fieldName)) {
            this.isWaitingForSelect = true
            return this.getCommand('printMatches')
        }

        return Object.keys(command).length === 0 ? emptyCommand : command
    }

}

export default CommandManager;
