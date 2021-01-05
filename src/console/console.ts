import "./console.scss"
import $ from "../common/import-jquery"
import {Strings} from "../constants/strings";

class Console {
    private readonly _consoleElemDom
    private readonly _messageContainer

    constructor() {
        this._consoleElemDom = $(`
            <div id="console-driver">
                <div id="title-container">
                    <span id="title-text">${Strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="message-container">
                    <div class="command-message-line ">
                        <span class="command-message"> Message 1</span>
                    </div>
                  <div class="command-message-line ">
                        <span class="command-message"> Message 1</span>
                    </div>
                     <div class="bot-message-line">
                        <span class="bot-message"> Message 2</span>
                    </div>
                     <div class="command-message-line ">
                        <span class="command-message"> Message 1</span>
                    </div>
                    <div class="bot-message-line">
                        <span class="bot-message"> Message 2</span>
                    </div>
                      <div class="command-message-line ">
                        <span class="command-message"> Message 1</span>
                    </div>
                     </div>
                <div id="input-command">
                    <textarea onchange="" placeholder="Команда"></textarea>
                </div>            
            </div>
        `)

        this._messageContainer = $('#message-container')

        $("body").append(this._consoleElemDom)
    }

    /**
     * The private methods
     */

    updateScroll() {
        this._messageContainer.scrollTop(this._messageContainer.innerHeight());
    }

    /**
     * The global methods
     */
    addBotMessage(message) {
        this._messageContainer
            .add(`<div class="bot-message-line">
                    <span class="message">${message}</span>
                  </div>`)
        this.updateScroll()
    }

    addCommandMessage(message) {
        this._messageContainer
            .add(`<div class="command-message-line">
                    <span class="message">${message}</span>
                  </div>`)
        this.updateScroll()
    }

    show() {
        // this._consoleElemDom.css("display", "inline-block");
    }
}

export default Console