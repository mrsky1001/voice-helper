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
                        <button id="${consoleNames.TITLE_CLOSE_BUTTON}" class="fa fa-close"></button>
                    </div>
                    <div id="${consoleNames.MESSAGE_CONTAINER_ID}"></div>
                    <div id="form-command">
                       <textarea id="${consoleNames.COMMAND_INPUT}" placeholder="Введите команду..." ></textarea>
                       <button id="${consoleNames.SEND_COMMAND}" >Оправить</button>
                    </div>            
                </div>
                <div id="${consoleNames.SHOW_CONSOLE_BUTTON}" class="hide-console">
                    <i class="fa fa-bars"></i>
                </div> 
        `)

        this._parent = parent
        this._pullMessages = parent.storageManager.listMessages
        this._indexMessage = -1
    }

    /**
     * The private methods
     */
    private get indexMessage(): number {
        if (this._indexMessage === -1)
            this._indexMessage = this._pullMessages.length > 0 ?
                this._pullMessages.length - 1 : 0
        return this._indexMessage
    }

    private set indexMessage(val) {
        this._indexMessage = val;
    }

    private get prevMessage(): string {
        const commandInput = $("#" + consoleNames.COMMAND_INPUT)

        if (this._pullMessages.length > 0) {
            if (this.indexMessage > 0 && String(commandInput.val()).length)
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
        this._parent.storageManager.listMessages = this._pullMessages
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
        const closeButton = $("#" + consoleNames.TITLE_CLOSE_BUTTON)
        const showButton = $("#" + consoleNames.SHOW_CONSOLE_BUTTON)

        const sendMessage = () => {
            const message = String(commandInput.val()).replace("\n", "")

            if (message.length > 1) {
                this.pushMessage(message)
                this.sendCommand(message)
            } else
                commandInput.val("")
        }

        closeButton.on('click', this.close)
        showButton.on('click', this.showConsole)
        sendButton.on('click', sendMessage)
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

    private showConsole() {
        const console = $("#" + consoleNames.CONSOLE_ID)
        const showButton = $("#" + consoleNames.SHOW_CONSOLE_BUTTON)

        console.removeClass("hide-console")
        showButton.addClass("hide-console")
    }

    private close() {
        const console = $("#" + consoleNames.CONSOLE_ID)
        const showButton = $("#" + consoleNames.SHOW_CONSOLE_BUTTON)

        console.addClass("hide-console")
        showButton.removeClass("hide-console")
    }

    private get messageContainer() {
        return $('#' + consoleNames.MESSAGE_CONTAINER_ID)
    }

    /**
     * The global methods
     */
    increaseSize() {
        const console = $("#" + consoleNames.CONSOLE_ID)
        const containerMessage = $("#" + consoleNames.MESSAGE_CONTAINER_ID)

        if (!console.hasClass("middle-console") && !console.hasClass("large-console")) {
            console.addClass("middle-console")
            containerMessage.addClass("middle-console")
        } else if (console.hasClass("middle-console")) {
            console.removeClass("middle-console")
            containerMessage.removeClass("middle-console")
            console.addClass("large-console")
        }

        // containerMessage.height(containerMessage.height() + scale)
    }

    decreaseSize() {
        const console = $("#" + consoleNames.CONSOLE_ID)
        const containerMessage = $("#" + consoleNames.MESSAGE_CONTAINER_ID)

        if (console.hasClass("large-console")) {
            console.removeClass("large-console")
            console.addClass("middle-console")
            containerMessage.addClass("middle-console")
        } else if (console.hasClass("middle-console")) {
            console.removeClass("middle-console")
            containerMessage.removeClass("middle-console")
        }
    }

    clearSendForm() {
        const commandInput = $("#" + consoleNames.COMMAND_INPUT)

        commandInput.val("")
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
    }

    show() {
        this.appendConsole()
        this.appendEventHandlers()

    }
}

export default Console