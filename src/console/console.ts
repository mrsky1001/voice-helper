import "./console.scss"
import $ from "../common/import-jquery"
import {strings} from "../constants/strings";
import {consoleNames} from "./consoleNames";

class Console {
    private readonly _consoleElemDom
    private readonly _messageContainer
    private readonly _parent
    private readonly _MAX_SCROLL = 999999

    constructor(parent) {
        this._consoleElemDom = $(`
            <div id="${consoleNames.CONSOLE_ID}">
                <div id="title-container">
                    <span id="title-text">${strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="${consoleNames.MESSAGE_CONTAINER_ID}"></div>
                <div id="form-command">
                   <textarea id="${consoleNames.COMMAND_INPUT}" placeholder="Введите команду..." ></textarea>
                   <button id="${consoleNames.SEND_COMMAND}" >Оправить</button>
                </div>            
            </div>
        `)

        this._parent = parent

    }

    /**
     * The private methods
     */
    private appendConsole() {
        const body = $("body")

        if (!body.is("#" + consoleNames.CONSOLE_ID))
            body.append(this._consoleElemDom)

    }

    private sendCommand(value) {
        this.clearSendForm()
        return this._parent.commandCallback(value)
    }

    private appendEventHandlers() {
        const commandInput = $("#" + consoleNames.COMMAND_INPUT)
        const sendButton = $("#" + consoleNames.SEND_COMMAND)

        sendButton.on('click',
            (e) =>
                this.sendCommand(commandInput.val())
        )

        commandInput.on('change focus keydown keyup',
            (e) => {
                if (e.key === 'Enter') {
                    this.sendCommand(e.target.value)
                }
            }
        )
    }

    private get messageContainer() {
        return $('#message-container')
    }

    /**
     * The global methods
     */
    clearSendForm() {
        const commandInput = $("#" + consoleNames.COMMAND_INPUT)

        commandInput.val("")
        // commandInput.trigger('blur')
    }

    updateScroll() {
        this.messageContainer.scrollTop(this._MAX_SCROLL);
    }

    addMessage(className, message) {
        this.messageContainer
            .append(`<div class="${className}">
                    <span class="message">${message}</span>
                  </div>`)
    }

    show() {
        this.appendConsole()
        this.appendEventHandlers()
    }
}

export default Console