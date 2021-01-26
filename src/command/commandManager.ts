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

    constructor(commands, coreCommands, settings) {
        this._commands = [];
        this._pullCommands = [];
        this._settings = settings;
        this._similarManager = new SimilarManager(this, settings);

        this.parseCommands(commands, coreCommands);
    }

    get similarManager(): SimilarManager {
        return this._similarManager
    }

    private parseCommands(commands, coreCommands): void {
        try {
            const isNotExist = (command: Command): boolean => {
                return (
                    this._commands.find((elem): boolean => {
                        return elem.id === command.id;
                    }) === undefined
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
            const command = this.commands.find((_): boolean => _.id === name);
            console.log(command);
            command.func();
        } catch (e) {
            console.error('Command: ' + name);
            console.error(strings.COMMAND_NOT_EXECUTED);
            console.error(e);
        }
    }

    public selectMatchCommand(msg: string): IPercentMatch {
        const num = +/\d+/.exec(msg)

        if (num > 0 && num <= this._similarManager.matches.length)
            return this._similarManager.matches[num - 1]

        return null
    }

    public parseCommand(msg: string): void {
        try {
            const isValidMessage = msg.length >= this._settings.minMessageSize;

            let resCommand: ICommand = this._commands.find((_): boolean => {
                return _.id === this._settings.notFoundCommandId;
            });

            if (this._similarManager.isWaitingAnswer) {
                resCommand = this.selectMatchCommand(msg).obj
                this._similarManager.isWaitingAnswer = false
            } else if (isValidMessage) {
                resCommand = this.parseTextToCommand(msg)

                if (resCommand.type !== commandTypes.SYSTEM) {
                    this._pullCommands.push(new Command(resCommand));
                }
            }

            if (resCommand instanceof Command)
                resCommand.func(msg);

        } catch (e) {
            console.error('Command not parsed!');
            console.error(e);
        }
    }

    public parseTextToCommand(msg: string): ICommand {
        const FIELD_NAME = 'listTexts'
        const listPercentMatches: IPercentMatch[] = this._similarManager.similarList(msg, this._commands, FIELD_NAME)
        const command = listPercentMatches.find(_ => _.isMax).obj

        if (command.matchPercent > 0 && this._similarManager.checkMatches(command.matchPercent, listPercentMatches, FIELD_NAME)) {
            return null
        }

        return command
    }

}

export default CommandManager;
