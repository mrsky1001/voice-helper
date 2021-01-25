/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import {commandTypes} from '../common/commandTypes';

interface ICommand {
    id: string;
    listTexts: string[];
    description: string;
    type: string;
    // tslint:disable-next-line
    func: (msg?: string) => any;
}

class Command implements ICommand {
    private readonly _id: string;
    private readonly _listTexts: string[];
    private readonly _description: string;
    private readonly _type: string;
    // tslint:disable-next-line
    private readonly _func: (msg?: string) => any;
    private _isExecuted;
    private _userText;
    private _matchPercent;

    constructor({id, listTexts = [], description, type = commandTypes.DEFAULT, func}: ICommand) {
        this._id = id;
        this._listTexts = listTexts;
        this._description = description;
        this._type = type;
        this._func = func;

        this._matchPercent = 0;
        this._userText = '';
        this._isExecuted = false;
    }

    /**
     * The global methods
     */

    /**
     * getters and setters
     */
    public get description(): string {
        return this._description;
    }

    public get type(): string {
        return this._type;
    }

    public get userText(): string {
        return this._userText;
    }

    public set userText(value) {
        this._userText = value;
    }

    public get matchPercent(): number {
        return this._matchPercent;
    }

    public set matchPercent(value) {
        this._matchPercent = value;
    }

    public get id(): string {
        return this._id;
    }

    public get listTexts(): string[] {
        return this._listTexts;
    }

    // tslint:disable-next-line
    public get func(): (msg?: string) => any {
        return this._func;
    }

    public get isExecuted(): boolean {
        return this._isExecuted;
    }

    public set isExecuted(value) {
        this._isExecuted = value;
    }
}

export {Command, ICommand};
