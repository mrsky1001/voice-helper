/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import stringSimilarity from 'string-similarity';
import {strings} from '../constants/strings';
import {Settings} from '../settings/settings';
import {IPercentMatch, PercentMatch} from "./percentMatch";
import {addBotMessage} from "../index";
import coreMessages from "../common/coreMessages";
import CommandManager from "./commandManager";
import commandTypes from "../common/commandTypes";

class SimilarManager {
    private readonly _settings: Settings;
    private readonly _commandManager: CommandManager;
    private _matches: IPercentMatch[];
    private _matchFieldName: string;

    constructor(commandManager, settings) {
        this._settings = settings;
        this._commandManager = commandManager;
        this._matches = [];
        this._matchFieldName = '';
    }

    /**
     * The global methods
     */
    get matches(): IPercentMatch[] {
        return this._matches;
    }

    set matches(val) {
        this._matches = val
    }

    get matchFieldName(): string {
        return this._matchFieldName;
    }

    set matchFieldName(val) {
        this._matchFieldName = val
    }

    public printMatches() {
        const text = `${coreMessages.MATCHES_MORE_ONE} <br/> ${this.matchesListToText(this._matchFieldName)}`

        addBotMessage(text);
    }


    public checkSimilar(msg: string, str: string): number {
        return stringSimilarity.compareTwoStrings(msg.toLowerCase(), str.toLowerCase())
    }


    public similarList(msg: string, list: Array<any>, fieldName: string): Array<IPercentMatch> {
        const percentsList: Array<IPercentMatch> = []
        let maxPercentIndex: number = 0

        const checkField = (msg, obj, fieldName, percentsList): void => {
            const isArray = Array.isArray(obj[fieldName]) && typeof obj[fieldName][0] === "string"
            const isString = typeof obj[fieldName] === "string"

            if (isArray) {
                let maxPercentMatch: IPercentMatch = new PercentMatch({})

                obj[fieldName].forEach(elem => {
                    const percent = this.checkSimilar(msg, elem)
                    if (percent > maxPercentMatch.percent)
                        maxPercentMatch = new PercentMatch(obj, percent)
                })

                percentsList.push(maxPercentMatch)
            } else if (isString) {
                const percent = this.checkSimilar(msg, obj[fieldName])
                percentsList.push(new PercentMatch(obj, percent))
            } else
                throw new Error(strings.INCORRECT_LIST_SIMILAR)

            console.info(percentsList[percentsList.length - 1])
        }

        list.forEach((obj): void => {
            if (obj.type !== commandTypes.SYSTEM)
                checkField(msg, obj, fieldName, percentsList)
        })

        percentsList.forEach((obj, idx): void => {
            maxPercentIndex = obj.percent > percentsList[maxPercentIndex].percent ? idx : maxPercentIndex
        })

        percentsList[maxPercentIndex].isMax = true

        return percentsList
    }

    public isContainMatches(matchPercent: number,
                            listPercentMatches: Array<IPercentMatch>,
                            fieldName: string,
                            matchesCoefficient: number = this._settings.matchesCoefficient): boolean {
        this.matchFieldName = fieldName
        this.matches = [];

        listPercentMatches.forEach((elem) => {
            if (matchPercent - elem.percent <= matchesCoefficient) {
                this.matches.push(elem);
            }
        });

        return this.matches.length > 1;
    }

    public matchesListToText(fieldName: string): string {
        let text = ''

        this.matches.forEach((match, idx): void => {
            const isArray = Array.isArray(match.obj[fieldName]) && typeof match.obj[fieldName][0] === "string"
            const isString = typeof match.obj[fieldName] === "string"
            let description = ''

            if (isArray) {
                description = match.obj[fieldName][0]
            } else if (isString) {
                description = match.obj[fieldName]
            } else
                throw new Error(strings.INCORRECT_LIST_SIMILAR)

            text += `${idx + 1}) "${description}". <br/>`

        })

        return text
    }

    public parseListToText(list: Array<any>, fieldName: string): string {
        let text = ''
        let counter = 1

        list.forEach((elem): void => {
            text += `${counter}) ${elem[fieldName]} <br/>`
            counter++
        })

        return text
    }

}

export default SimilarManager;
