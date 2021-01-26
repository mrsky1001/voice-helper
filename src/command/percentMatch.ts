/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

interface IPercentMatch {
    obj: any
    percent: number
    isMax: boolean
}

class PercentMatch implements IPercentMatch {
    private readonly _obj: any
    private _percent: number
    private _isMax: boolean

    constructor(obj: any, percent: number = 0, isMax: boolean = false) {
        this._obj = obj
        this._percent = percent
        this._isMax = isMax
    }

    get obj(): any {
        return this._obj;
    }

    get percent(): number {
        return this._percent;
    }

    set percent(val) {
        this._percent = val
    }

    get isMax(): boolean {
        return this._isMax;
    }

    set isMax(val) {
        this._isMax = val
    }
}

export {PercentMatch, IPercentMatch}