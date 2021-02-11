/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import { commandTypes } from '../common/commandTypes';
import { strings } from '../constants/strings';
import { addBotMessage } from '../index';
import { Settings } from '../settings/settings';
import { Command, ICommand } from './command';
import { IPercentMatch } from './percentMatch';
import SimilarManager from './similarManager';

class CommandManager {
  private get isWaitingForSelect(): boolean {
    return this._isWaitingForSelect;
  }

  private set isWaitingForSelect(val) {
    this._isWaitingForSelect = val;
  }

  private get lastCommand(): Command {
    return this._pullCommands[this._pullCommands.length - 1];
  }

  private get emptyCommand(): Command {
    return this.getCommand(this._settings.notFoundCommandId);
  }

  public get similarManager(): SimilarManager {
    return this._similarManager;
  }

  public get commands(): Command[] {
    return this._commands;
  }

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
    this._isWaitingForSelect = false;

    this.parseCommands(commands, coreCommands);
  }

  /**
   * The global methods
   */
  public printCommands(): void {
    const parseCommandsToText = (commands?: Command[]): string => {
      let text = '<br/>';

      const parse = (list: Command[]): void => {
        let counter: number = 0;

        list.forEach((command): void => {
          if (command.type !== commandTypes.SYSTEM) {
            text += `${++counter}) "${command.listTexts[0]}".`;

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
        text = 'Список всех доступных команд: <br/>';
        parse(this._commands);
      }

      return text;
    };

    addBotMessage(parseCommandsToText());
  }

  //
  // public printCommandGroups(): void {
  //     const parseCommandsToText = (): string => {
  //         let text = '<br/>';
  //
  //         const parse = (list: Command[]): void => {
  //             let counter: number = 0;
  //
  //             list.forEach((command): void => {
  //                 if (command.type !== commandTypes.SYSTEM) {
  //                     text += `${++counter}) "${command.group}".`;
  //
  //                     if (command.description !== undefined) {
  //                         text += `<br/> ${command.description}`;
  //                     }
  //
  //                     text += '<br/>';
  //                 }
  //             });
  //         };
  //
  //         text = 'Список команд по группам: <br/>';
  //         parse(this._commands);
  //
  //         return text;
  //     };
  //
  //     addBotMessage(parseCommandsToText());
  // }

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
    if (num > 0 && num <= this._similarManager.matches.length) {
      return this._similarManager.matches[num - 1];
    }

    return null;
  }

  public parseTextToCommand(msg: string): ICommand {
    const fieldName = 'listTexts';
    const listPercentMatches: IPercentMatch[] = this._similarManager.similarList(msg, this._commands, fieldName);
    const command = listPercentMatches.find((_) => _.isMax).obj;

    if (Object.keys(command).length === 0) { return this.emptyCommand; }
    else {
      command.matchPercent = listPercentMatches.find((_) => _.isMax).percent;

      if (command.matchPercent > 0 && this._similarManager.isContainMatches(command.matchPercent, listPercentMatches, fieldName)) {
        this.printMatchesAndWaiting();
        return null;
      }

      return command;
    }
  }

  public parseCommand(msg: string): void {
    const setCommand = (command: ICommand, msg: string): void => {
      command.userText = msg;

      if (command.type !== commandTypes.SYSTEM) {
        this._pullCommands.push(new Command(command));
      }
    };

    const handlerWaitingForSelect = (msg: string, num: number): void => {
      const selectedCommand: IPercentMatch = this.selectMatchCommand(num);

      if (selectedCommand === null) {
        this.emptyCommand.func();
        this.isWaitingForSelect = false;
      } else if (selectedCommand.obj instanceof Command) {
        setCommand(selectedCommand.obj, msg);
        selectedCommand.obj.func(msg);
      } else {
        this.lastCommand.func(this.lastCommand.userText, selectedCommand.obj);
        this.isWaitingForSelect = false;
      }
    };

    const handlerStandardCommand = (msg: string): void => {
      const isValidMessage = msg.length >= this._settings.minMessageSize;
      let resCommand: ICommand;

      if (isValidMessage) {
        resCommand = this.parseTextToCommand(msg);

        if (resCommand === null) {
          return null;
        } else {
          setCommand(resCommand, msg);
        }
      } else {
        resCommand = this.emptyCommand;
      }

      resCommand.func(msg);
    };

    try {
      const num = +/\d+/.exec(msg);

      if (this.isWaitingForSelect && num > 0) {
        handlerWaitingForSelect(msg, num);
      } else {
        handlerStandardCommand(msg);
      }
    } catch (e) {
      console.error('Command not parsed!');
      console.error(e);
    }
  }

  public printMatchesAndWaiting() {
    this.isWaitingForSelect = true;
    this.similarManager.printMatches();
  }

  private getCommand(id) {
    return this.commands.find((_): boolean => {
      return _.id === id;
    });
  }

  private parseCommands(commands, coreCommands): void {
    const isNotExist = (command: Command): boolean => {
      return this.getCommand(command.id) === undefined;
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

    try {
      commands.forEach((elem): void => {
        prepareCommand(elem);
      });

      coreCommands.forEach((elem): void => {
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
