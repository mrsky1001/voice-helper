class Command {
    private readonly _id
    private readonly _text
    private readonly _functionFile
    private readonly _functionName

    private _isRun

    constructor({id, text, functionFile, functionName}) {
        this._id = id
        this._text = text
        this._functionFile = functionFile
        this._functionName = functionName

        this._isRun = false
    }


    /**
     * The global methods
     */
    start() {
        this.isRun = true
    }

    /**
     * getters and setters
     */
    get isRun() {
        return this._isRun
    }

    set isRun(value) {
        this._isRun = value
    }

}

export default Command