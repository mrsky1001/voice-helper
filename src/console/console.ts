import "./console.scss"
import $ from "../common/import-jquery"
import {strings} from "../constants/strings";
import {consoleNames} from "./consoleNames";

class Console {
    private readonly _consoleElemDom
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
                this.sendCommand(String(commandInput.val()).replace(/[\n\t\r]/g,""))
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