/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import functions from './functions';

export const commands = [
  {
    id: 'reloadPage',
    text: 'Перезагрузить сайт',
    func: functions.RELOAD,
  },
];

export default commands;
