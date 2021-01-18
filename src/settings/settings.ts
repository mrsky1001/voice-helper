interface ISettings {
    minMessageSize?: number
    matchesCoefficient?: number
    minPercentSimilar?: number
    scaleSize?: number
    width?: string
    height?: string
    maxSizeListMessage?: number
}

class Settings implements ISettings {
    private readonly _minMessageSize: number
    private readonly _minPercentSimilar: number
    private readonly _matchesCoefficient: number
    private readonly _height: string
    private readonly _width: string
    private readonly _maxSizeListMessage: number
    private readonly _notFoundCommandId = "notFound"

    constructor(settings: ISettings = {
        minMessageSize: 5,
        minPercentSimilar: 0.4,
        matchesCoefficient: 0.1,
        scaleSize: 100,
        width: '20%',
        height: '25%',
        maxSizeListMessage: 100
    }) {
        this._minMessageSize = settings.minMessageSize
        this._matchesCoefficient = settings.matchesCoefficient
        this._minPercentSimilar = settings.minPercentSimilar
        this._height = settings.height
        this._width = settings.width
        this._maxSizeListMessage = settings.maxSizeListMessage
    }

    get matchesCoefficient(): number {
        return this._matchesCoefficient;
    }

    get maxSizeListMessage(): number {
        return this._maxSizeListMessage;
    }

    get height(): string {
        return this._height;
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