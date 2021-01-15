import "./console.scss"
import $ from "../common/import-jquery"
import {strings} from "../constants/strings";
import {consoleNames} from "./consoleNames";
import ConsoleDriver from "./consoleDriver";

class Console {
    private readonly _consoleElemDom
    private readonly _parent: ConsoleDriver
    private readonly _MAX_SCROLL = 999999
    private readonly _pullMessages: Array<string>
    private _indexMessage: number

    constructor(parent: ConsoleDriver) {
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
        this._pullMessages = []
        this._indexMessage = 0
    }

    /**
     * The private methods
     */
    private get indexMessage(): number {
        this._indexMessage = this._pullMessages.length > 0 ?
            this._pullMessages.length - 1 : 0
        return this._indexMessage
    }

    private set indexMessage(val) {
        this._indexMessage = val;
    }

    private get prevMessage(): string {
        if (this._pullMessages.length > 0) {
            if (this.indexMessage > 0)
                this.indexMessage--
            return this._pullMessages[this.indexMessage]
        } else
            return ""
    }

    private get nextMessage(): string {
        if (this._pullMessages.length > 0) {
            if (this.indexMessage < this._pullMessages.length - 1) {
                this.indexMessage++
                return this._pullMessages[this.indexMessage]
            } else
                return ""
        } else
            return ""
    }

    private pushMessage(text: string) {
        this._pullMessages.push(text)
        this.indexMessage = this._pullMessages.length - 1;
    }

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

        const sendMessage = () => {
            const message = String(commandInput.val()).replace("\n", "")

            if (message.length > 1) {
                this.pushMessage(message)
                this.sendCommand(message)
            } else
                commandInput.val("")
        }

        sendButton.on('click',
            (e) =>
                sendMessage()
        )

        commandInput.on('keyup',
            (e) => {
                if (e.key === 'Enter') {
                    sendMessage()
                } else if (e.key === 'ArrowUp') {
                    commandInput.val(this.prevMessage)
                } else if (e.key === 'ArrowDown') {
                    commandInput.val(this.nextMessage)
                }
            }
        )
    }

    private get messageContainer() {
        return $('#' + consoleNames.MESSAGE_CONTAINER_ID)
    }

    private checkMessageRequirements() {
        $('.command-message-line').each((i, elem) => {
            const message = $(elem).find('.message')[0]
            const isEmpty = message.innerText.length === 0

            if (isEmpty)
                elem.remove()
        })
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

    addMessage(className, message = "") {
        if (message.trim().length > 0)
            this.messageContainer
                .append(`<div class="${className}">
                    <div class="message">${message}</div>
                  </div>`)

        // this.checkMessageRequirements()
    }

    show() {
        this.appendConsole()
        this.appendEventHandlers()
    }
}

export default Console