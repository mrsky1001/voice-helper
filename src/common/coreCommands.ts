/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import { commandTypes } from './commandTypes';
import coreFunctions from './coreFunctions';

export const coreCommands = [
  {
    id: 'hello',
    listTexts: 'Привет',
    type: commandTypes.SYSTEM,
    func: coreFunctions.HELLO,
  },
  {
    id: 'notFound',
    type: commandTypes.SYSTEM,
    isSystem: true,
    func: coreFunctions.NOT_FOUND_COMMAND,
  },
  {
    id: 'printMatches',
    type: commandTypes.SYSTEM,
    isSystem: true,
    func: coreFunctions.PRINT_MATCHES,
  },
  {
    id: 'commands',
    listTexts: 'Список команд',
    description: 'Показывает список доступных комманд для вызова через консоль или голосом.',
    type: commandTypes.INFO,
    func: coreFunctions.SHOW_COMMANDS,
  },
  {
    id: 'increaseHeightConsole',
    listTexts: 'Увеличить высоту консоли',
    description: 'Увеличивает высоту консоли.',
    type: commandTypes.INFO,
    func: coreFunctions.INCREASE_CONSOLE,
  },
  {
    id: 'decreaseHeightConsole',
    listTexts: 'Уменьшить высоту консоли',
    description: 'Уменьшает высоту консоли.',
    type: commandTypes.INFO,
    func: coreFunctions.DECREASE_CONSOLE,
  },
  {
    id: 'closeConsole',
    listTexts: 'Закрыть консоль',
    description: 'Сворачивает окно консоли.',
    type: commandTypes.INFO,
    func: coreFunctions.CLOSE_CONSOLE,
  },
  {
    id: 'reloadPage',
    listTexts: 'Перезагрузить сайт',
    description: 'Перезагрузка сайта.',
    type: commandTypes.INFO,
    func: coreFunctions.RELOAD,
  },
];

export default coreCommands;
