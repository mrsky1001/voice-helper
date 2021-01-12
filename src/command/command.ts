class Command {

    private readonly _id
    private readonly _text
    private readonly _functionFile
    private readonly _functionName

    private _isRun
    private _userText
    private _matchPercent

    constructor({id, text, functionFile, functionName}) {
        this._id = id
        this._text = text
        this._functionFile = functionFile
        this._functionName = functionName

        this._matchPercent = 0
        this._userText = ""
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
    get userText() {
        return this._userText;
    }

    set userText(value) {
        this._userText = value;
    }

    get matchPercent() {
        return this._matchPercent;
    }

    set matchPercent(value) {
        this._matchPercent = value;
    }

    get id() {
        return this._id;
    }

    get text() {
        return this._text;
    }

    get functionFile() {
        return this._functionFile;
    }

    get functionName() {
        return this._functionName;
    }

    get isRun() {
        return this._isRun
    }

    set isRun(value) {
        this._isRun = value
    }

}

export default Command