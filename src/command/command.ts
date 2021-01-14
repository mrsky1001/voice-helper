import {commandTypes} from "../common/commandTypes";

interface ICommand {
    id: string
    text: string
    type: string
    func: () => any
}

class Command implements ICommand {
    private readonly _id: string
    private readonly _text: string
    private readonly _type: string
    private readonly _func: () => any

    private _isRun
    private _isExecuted
    private _userText
    private _matchPercent

    constructor({id, text, type = commandTypes.DEFAULT, func}: ICommand) {
        this._id = id
        this._text = text
        this._type = type
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
    get type() {
        return this._type;
    }

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

export {Command, ICommand}