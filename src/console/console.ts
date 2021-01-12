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
    private readonly SEND_COMMAND = "send-command"

    constructor(parent) {
        this._consoleElemDom = $(`
            <div id="${this.CONSOLE_ID}">
                <div id="title-container">
                    <span id="title-text">${strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="${this.MESSAGE_CONTAINER_ID}"></div>
                <div id="form-command">
                   <textarea id="${this.COMMAND_INPUT}" placeholder="Введите команду..." ></textarea>
                   <button id="${this.SEND_COMMAND}" >Оправить</button>
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

    private sendCommand (value){
        this.clearSendForm()
        return this._parent.commandCallback(value)
    }

    private appendEventHandlers() {
        const commandInput = $("#" + this.COMMAND_INPUT)
        const sendButton = $("#" + this.SEND_COMMAND)

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

    /**
     * The global methods
     */
    clearSendForm() {
        const commandInput = $("#" + this.COMMAND_INPUT)

        commandInput.val("")
        commandInput.trigger('blur')
    }

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