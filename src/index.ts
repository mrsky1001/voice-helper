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

export const similarList = (msg: string, list: Array<any>, descriptionField: string): Array<IPercentMatch> => {
    return voiceHelper.commandManager.similarManager.similarList(msg, list, descriptionField);
};

export const checkMatches = (matchPercent: number,
                             listPercentMatches: Array<IPercentMatch>,
                             descriptionField: string,
                             matchesCoefficient?: number): boolean => {
    return voiceHelper.commandManager.similarManager.checkMatches(matchPercent,
        listPercentMatches, descriptionField, matchesCoefficient);
};

export const matchesListToText = (matches: Array<IPercentMatch>, descriptionField: string): string => {
    return voiceHelper.commandManager.similarManager.matchesListToText(descriptionField);
};

export const parseListToText = (list: Array<any>, descriptionField: string): string => {
    return voiceHelper.commandManager.similarManager.parseListToText(list, descriptionField);
};

export default {startVoiceHelper, addBotMessage, checkSimilar, similarList, matchesListToText, parseListToText};
