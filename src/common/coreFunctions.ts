/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import { Command } from '../command/command';
import { addBotMessage } from '../index';
import { voiceHelper } from '../voiceHelper/voiceHelper';
import coreMessages from './coreMessages';

export const coreFunctions = {
  HELLO: (): void => {
    addBotMessage(coreMessages.HELLO);
  },
  SMALL_OR_EMPTY: (): void => {
    addBotMessage(coreMessages.SMALL_OR_EMPTY);
  },
  NOT_FOUND_COMMAND: (): void => {
    addBotMessage(coreMessages.NOT_FOUND_COMMAND);
  },
  INCORRECT_COMMAND: (): void => {
    console.log('Incorrect command!');
  },
  SHOW_COMMAND_GROUPS: (): void => {
    voiceHelper.commandManager.printCommandGroups();
  },
  SHOW_COMMANDS: (): void => {
    voiceHelper.commandManager.printCommands();
  },
  INCREASE_CONSOLE: (): void => {
    voiceHelper.consoleDriver.increaseConsole();
  },
  DECREASE_CONSOLE: (): void => {
    voiceHelper.consoleDriver.decreaseConsole();
  },
  PRINT_MATCHES: (): void => {
    voiceHelper.commandManager.similarManager.printMatches();
  },
  SHOW_CONSOLE: (): void => {
    voiceHelper.consoleDriver.createConsole();
    addBotMessage(coreMessages.CONSOLE_IS_OPEN);
  },
  CLOSE_CONSOLE: (): void => {
    voiceHelper.consoleDriver.closeConsole();
    addBotMessage(coreMessages.CONSOLE_IS_CLOSE);
  },
  RELOAD: (): void => {
    location.reload();
    console.log('RELOAD!');
  },
};

export default coreFunctions;
