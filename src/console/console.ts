import "./console.scss"
import $ from "../common/import-jquery"
import {Strings} from "../constants/strings";

class Console {
    private readonly _consoleElemDom
    private readonly _messageContainer
    private readonly _input

    constructor(commandCallback) {

        this._consoleElemDom = $(`
            <div id="console-driver">
                <div id="title-container">
                    <span id="title-text">${Strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="message-container">
                </div>
                <div id="input-command">
                   <textarea id="comm"  content="12" placeholder="Введите команду..." ></textarea>
                </div>            
            </div>
        `)
        // this._input.on('change', commandCallback)
        // this._input.on('focus keydown keyup', (e) => {
        //     console.log(e)
        // })
        //
        $("#comm").on('change focus keydown keyup', commandCallback)

        this._messageContainer = $('#message-container')

        $("body").append(this._consoleElemDom)
    }

    /**
     * The private methods
     */
    addMessage(className, message) {
        this._messageContainer
            .add(`<div class="${className}">
                    <span class="message">${message}</span>
                  </div>`)
    }

    updateScroll() {
        this._messageContainer.scrollTop(this._messageContainer.innerHeight());
    }

    /**
     * The global methods
     */


    show() {
        // this._consoleElemDom.css("display", "inline-block");
    }
}

export default Console