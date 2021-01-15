interface ISettings {
    minMessageSize?: number
    minPercentSimilar?: number
    scaleSize?: number
    width?: string
    height?: string
}

class Settings implements ISettings {
    private readonly _minMessageSize: number
    private readonly _minPercentSimilar: number
    private readonly _scaleSize: number
    private readonly _height: string
    private readonly _width: string
    private readonly _notFoundCommandId = "notFound"

    constructor(settings: ISettings = {
        minMessageSize: 5,
        minPercentSimilar: 0.4,
        scaleSize: 30,
        width: '20%',
        height: '25%'
    }) {
        this._minMessageSize = settings.minMessageSize
        this._minPercentSimilar = settings.minPercentSimilar
        this._scaleSize = settings.scaleSize
        this._height = settings.height
        this._width = settings.width
    }

    get scaleSize(): number {
        return this._scaleSize;
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