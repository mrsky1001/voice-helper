/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import {ICommand} from './command/command';
import {ISettings} from './settings/settings';
import {voiceHelper} from './voiceHelper/voiceHelper';
import {IPercentMatch} from "./command/percentMatch";

export const startVoiceHelper = (commands: ICommand[] = [], settings?: ISettings): void => {
    voiceHelper.init(commands, settings);
};

export const addBotMessage = (message: string): void => {
    voiceHelper.consoleDriver.addBotMessage(String(message));
};

export const checkSimilar = (msg: string, str: string): number => {
    return voiceHelper.commandManager.checkSimilar(msg, str);
};

export const similarList = (msg: string, list: Array<any>, field: string): Array<IPercentMatch> => {
    return voiceHelper.commandManager.similarList(msg, list, field);
};

export const checkMatches = (matchPercent: number,
                             listPercentMatches: Array<IPercentMatch>,
                             matchesCoefficient?: number): boolean=> {
    return voiceHelper.commandManager.checkMatches(matchPercent, listPercentMatches, matchesCoefficient);
};

export const matchesListToText = (matches: Array<IPercentMatch>, field: string): string => {
    return voiceHelper.commandManager.matchesListToText(matches, field);
};

export const parseToListText = (list: Array<any>, field: string): string => {
    return voiceHelper.commandManager.parseToListText(list, field);
};

export default {startVoiceHelper, addBotMessage, checkSimilar, similarList, matchesListToText, parseToListText};
