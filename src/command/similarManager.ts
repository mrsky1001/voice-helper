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
    private _isWaitingAnswer: boolean

    constructor(commandManager, settings) {
        this._settings = settings;
        this._commandManager = commandManager;
        this._matches = [];
        this._isWaitingAnswer = false
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

    get isWaitingAnswer(): boolean {
        return this._isWaitingAnswer;
    }

    set isWaitingAnswer(val) {
        this._isWaitingAnswer = val;
    }


    public printMatches(descriptionField: string) {
        const text = `${coreMessages.MATCHES_MORE_ONE} <br/> ${this.matchesListToText(descriptionField)}`

        addBotMessage(text);
    }


    public checkSimilar(msg: string, str: string): number {
        return stringSimilarity.compareTwoStrings(msg.toLowerCase(), str.toLowerCase())
    }


    public similarList(msg: string, list: Array<any>, descriptionField: string): Array<IPercentMatch> {
        const percentsList: Array<IPercentMatch> = []
        let maxPercentIndex: number = 0

        const checkField = (msg, obj, descriptionField, percentsList): void => {
            const isArray = Array.isArray(obj[descriptionField]) && typeof obj[descriptionField][0] === "string"
            const isString = typeof obj[descriptionField] === "string"

            if (isArray) {
                let maxPercentMatch: IPercentMatch = new PercentMatch({})

                obj[descriptionField].forEach(elem => {
                    const percent = this.checkSimilar(msg, elem)
                    if (percent > maxPercentMatch.percent)
                        maxPercentMatch = new PercentMatch(obj, percent)
                })

                percentsList.push(maxPercentMatch)
            } else if (isString) {
                const percent = this.checkSimilar(msg, obj[descriptionField])
                percentsList.push(new PercentMatch(obj, percent))
            } else
                throw new Error(strings.INCORRECT_LIST_SIMILAR)

            console.info(percentsList[percentsList.length - 1])
        }

        list.forEach((obj): void => {
            if (obj.type !== commandTypes.SYSTEM)
                checkField(msg, obj, descriptionField, percentsList)
        })

        percentsList.forEach((obj, idx): void => {
            maxPercentIndex = obj.percent > percentsList[maxPercentIndex].percent ? idx : maxPercentIndex
        })

        percentsList[maxPercentIndex].isMax = true

        return percentsList
    }

    public checkMatches(matchPercent: number,
                        listPercentMatches: Array<IPercentMatch>,
                        descriptionField: string,
                        matchesCoefficient: number = this._settings.matchesCoefficient): boolean {
        this.matches = [];

        listPercentMatches.forEach((elem) => {
            if (matchPercent - elem.percent <= matchesCoefficient) {
                this.matches.push(elem);
            }
        });

        this.printMatches(descriptionField)
        this._isWaitingAnswer = this.matches.length > 1

        return this.matches.length > 1;
    }

    public matchesListToText(descriptionField: string): string {
        let text = ''

        this.matches.forEach((match, idx): void => {
            const isArray = Array.isArray(match.obj[descriptionField]) && typeof match.obj[descriptionField][0] === "string"
            const isString = typeof match.obj[descriptionField] === "string"
            let description = ''

            if (isArray) {
                description = match.obj[descriptionField][0]
            } else if (isString) {
                description = match.obj[descriptionField]
            } else
                throw new Error(strings.INCORRECT_LIST_SIMILAR)

            text += `${idx + 1}) "${description}". <br/>`

        })

        return text
    }

    public parseListToText(list: Array<any>, descriptionField: string): string {
        let text = ''
        let counter = 1

        list.forEach((elem): void => {
            text += `${counter}) ${elem[descriptionField]} <br/>`
            counter++
        })

        return text
    }

}

export default SimilarManager;
