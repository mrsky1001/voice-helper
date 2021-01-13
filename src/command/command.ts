class Command {

    private readonly _id
    private readonly _text
    private readonly _func

    private _isRun
    private _isExecuted
    private _userText
    private _matchPercent

    constructor({id, text, func}) {
        this._id = id
        this._text = text
        this._func = func

        this._matchPercent = 0
        this._userText = ""
        this._isExecuted = false
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

    get func() {
        return this._func;
    }

    get isRun() {
        return this._isRun
    }

    set isRun(value) {
        this._isRun = value
    }

    get isExecuted() {
        return this._isExecuted
    }

    set isExecuted(value) {
        this._isExecuted = value
    }

}

export default Command