import "./console.scss"
import $ from "../common/import-jquery"
import {strings} from "../constants/strings";

class Console {
    private readonly _consoleElemDom
    private readonly _messageContainer
    private readonly _parent

    private readonly CONSOLE_ID = "console-driver"
    private readonly MESSAGE_CONTAINER_ID = "message-container"
    private readonly COMMAND_INPUT = "command-textarea"

    constructor(parent) {
        this._consoleElemDom = $(`
            <div id="${this.CONSOLE_ID}">
                <div id="title-container">
                    <span id="title-text">${strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="${this.MESSAGE_CONTAINER_ID}"></div>
                <div id="input-command">
                   <textarea id="${this.COMMAND_INPUT}" placeholder="Введите команду..." ></textarea>
                </div>            
            </div>
        `)

        this._parent = parent
        this._messageContainer = $('#message-container')
    }

    /**
     * The private methods
     */
    private appendConsole() {
        const body = $("body")

        if (!body.is("#" + this.CONSOLE_ID))
            body.append(this._consoleElemDom)

    }

    private appendEventHandlers() {
        $("#" + this.COMMAND_INPUT).on('change focus keydown keyup',
            (e) => this._parent.commandCallback(e.target.value))
    }

    /**
     * The global methods
     */
    updateScroll() {
        this._messageContainer.scrollTop(this._messageContainer.innerHeight());
    }

    addMessage(className, message) {
        this._messageContainer
            .add(`<div class="${className}">
                    <span class="message">${message}</span>
                  </div>`)
    }

    show() {
        this.appendConsole()
        this.appendEventHandlers()
    }
}

export default Console