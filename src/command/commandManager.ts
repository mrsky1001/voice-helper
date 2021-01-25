/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import stringSimilarity from 'string-similarity';
import {commandTypes} from '../common/commandTypes';
import coreFunctions from '../common/coreFunctions';
import {strings} from '../constants/strings';
import {Settings} from '../settings/settings';
import {Command} from './command';

class CommandManager {
    /**
     * getters and setters
     */
    public get commands(): Command[] {
        return this._commands;
    }

    private readonly _commands: Command[];
    private readonly _pullCommands: Command[];
    private readonly _settings: Settings;

    constructor(commands, coreCommands, settings) {
        this._commands = [];
        this._pullCommands = [];
        this._settings = settings;

        this.parseCommands(commands, coreCommands);
    }

    /**
     * The global methods
     */

    public getTextCommands(commands?: Command[]): string {
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

    public checkSimilar(msg: string, str: string): number {
        return stringSimilarity.compareTwoStrings(msg.toLowerCase(), str.toLowerCase())
    }

    public parseTextToCommand(msg): boolean {
        try {
            let resCommand: Command = this._commands.find((_): boolean => {
                return _.id === this._settings.notFoundCommandId;
            });

            const isValidMessage = msg.length >= this._settings.minMessageSize;

            const checkSimilar = (command): Command => {
                const texts = command.listTexts.map((str): void => stringSimilarity.compareTwoStrings(msg, str))
                const percent = texts.length > 0 ? Math.max.apply(Math, texts) : 0

                command.matchPercent = percent;

                if (percent > resCommand.matchPercent && percent > this._settings.minPercentSimilar) {
                    resCommand = command;
                }

                // console.log(`Percent: ${percent}  | Command: "${msg}" / CheckedCommand: "${command.listTexts[0]}"`);
                return command;
            };

            const checkMatches = (listPercentMatches, command): Command[] => {
                const matches: Command[] = [];

                listPercentMatches.forEach((elem): void => {
                    if (command.matchPercent - elem.matchPercent <= this._settings.matchesCoefficient) {
                        matches.push(elem);
                    }
                });

                return matches;
            };

            const pushMessage = (msg): boolean => {
                const listPercentMatches: Command[] = this._commands.map((command): Command => {
                    return checkSimilar(command);
                });

                if (resCommand.matchPercent > 0) {
                    const matches = checkMatches(listPercentMatches, resCommand);

                    if (matches.length > 1) {
                        coreFunctions.MATCHES_MORE_ONE(matches);
                        return false;
                    }

                    if (resCommand.type !== commandTypes.SYSTEM) {
                        this._pullCommands.push(new Command(resCommand));
                    }
                }

                resCommand.func(msg);
                return true;
            };

            if (isValidMessage) {
                return pushMessage(msg);
            } else {
                resCommand.func(msg);
            }

            return false;
        } catch (e) {
            console.error('Command not parsed!');
            console.error(e);
        }
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
}

export default CommandManager;
