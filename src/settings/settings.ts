interface ISettings {
    minMessageSize?: number
    minPercentSimilar?: number
}

class Settings implements ISettings {
    private readonly _minMessageSize: number
    private readonly _minPercentSimilar: number
    private readonly _notFoundCommandId = "notFound"

    constructor(settings: ISettings = {minMessageSize: 5, minPercentSimilar: 40}) {
        this._minMessageSize = settings.minMessageSize
        this._minPercentSimilar = settings.minPercentSimilar
    }

    get minMessageSize() {
        return this._minMessageSize
    }

    get minPercentSimilar() {
        return this._minPercentSimilar
    }

    get notFoundCommandId() {
        return this._notFoundCommandId
    }
}

export {ISettings, Settings}