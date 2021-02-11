/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import commandGroups from './commandGroups';
import { commandTypes } from './commandTypes';
import coreFunctions from './coreFunctions';

export const coreCommands = [
  {
    id: 'hello',
    listTexts: 'Привет',
    type: commandTypes.SYSTEM,
    group: commandGroups.SYSTEM,
    func: coreFunctions.HELLO,
  },
  {
    id: 'notFound',
    type: commandTypes.SYSTEM,
    group: commandGroups.SYSTEM,
    isSystem: true,
    func: coreFunctions.NOT_FOUND_COMMAND,
  },
  {
    id: 'allCommands',
    listTexts: ['Список команд', 'Какие есть команды', 'Список всех доступных команд'],
    description: 'Показывает список доступных комманд для вызова через консоль или голосом.',
    type: commandTypes.INFO,
    group: commandGroups.MAIN,
    func: coreFunctions.SHOW_COMMANDS,
  },
  {
    id: 'increaseHeightConsole',
    listTexts: 'Увеличить высоту консоли',
    description: 'Увеличивает высоту консоли.',
    group: commandGroups.CONSOLE_CONTROL,
    type: commandTypes.INFO,
    func: coreFunctions.INCREASE_CONSOLE,
  },
  {
    id: 'decreaseHeightConsole',
    listTexts: 'Уменьшить высоту консоли',
    description: 'Уменьшает высоту консоли.',
    group: commandGroups.CONSOLE_CONTROL,
    type: commandTypes.INFO,
    func: coreFunctions.DECREASE_CONSOLE,
  },
  {
    id: 'closeConsole',
    listTexts: 'Закрыть консоль',
    description: 'Сворачивает окно консоли.',
    group: commandGroups.CONSOLE_CONTROL,
    type: commandTypes.INFO,
    func: coreFunctions.CLOSE_CONSOLE,
  },
  {
    id: 'reloadPage',
    listTexts: 'Перезагрузить сайт',
    description: 'Перезагрузка сайта.',
    group: commandGroups.MAIN,
    type: commandTypes.INFO,
    func: coreFunctions.RELOAD,
  },
];

export default coreCommands;
