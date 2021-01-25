/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import {ICommand} from './command/command';
import {ISettings} from './settings/settings';
import {voiceHelper} from './voiceHelper/voiceHelper';

export const startVoiceHelper = (commands: ICommand[] = [], settings?: ISettings): void => {
    voiceHelper.init(commands, settings);
};

export const addBotMessage = (message: string): void => {
    voiceHelper.consoleDriver.addBotMessage(String(message));
};

export const checkSimilar = (msg: string, str: string): number => {
    return voiceHelper.commandManager.checkSimilar(msg, str);
};

export default {startVoiceHelper, addBotMessage, checkSimilar};
