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
    return voiceHelper.commandManager.similarManager.checkSimilar(msg, str);
};

export const similarList = (msg: string, list: Array<any>, fieldName: string): Array<IPercentMatch> => {
    return voiceHelper.commandManager.similarManager.similarList(msg, list, fieldName);
};

export const isContainMatches = (matchPercent: number,
                                 listPercentMatches: Array<IPercentMatch>,
                                 fieldName: string,
                                 matchesCoefficient?: number): boolean => {
    return voiceHelper.commandManager.similarManager.isContainMatches(matchPercent,
        listPercentMatches, fieldName, matchesCoefficient);
};

export const matchesListToText = (matches: Array<IPercentMatch>, fieldName: string): string => {
    return voiceHelper.commandManager.similarManager.matchesListToText(fieldName);
};

export const parseListToText = (list: Array<any>, fieldName: string): string => {
    return voiceHelper.commandManager.similarManager.parseListToText(list, fieldName);
};

export default {
    startVoiceHelper,
    addBotMessage,
    checkSimilar,
    similarList,
    matchesListToText,
    isContainMatches,
    parseListToText
};
