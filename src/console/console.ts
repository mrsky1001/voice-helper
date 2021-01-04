import "./console.scss"
import $ from "../common/import-jquery"
import {Strings} from "../constants/strings";

class Console {
    private readonly _consoleElemDom

    constructor() {
        this._consoleElemDom = $(`
            <div id="console-driver">
                <div id="title-container">
                    <span id="title-text">${Strings.CONSOLE_TITLE}</span>
                    <button id="title-close-button">X</button>
                </div>
                <div id="text-container">
                    <div class="text-line-command ">
                        <span class="command-message"> Message 1</span>
                    </div>
                  <div class="text-line-command ">
                        <span class="command-message"> Message 1</span>
                    </div>
                     <div class="text-line-bot">
                        <span class="bot-message"> Message 2</span>
                    </div>
                     <div class="text-line-command ">
                        <span class="command-message"> Message 1</span>
                    </div>
                    <div class="text-line-bot">
                        <span class="bot-message"> Message 2</span>
                    </div>
                      <div class="text-line-command ">
                        <span class="command-message"> Message 1</span>
                    </div>
                     </div>
                <div id="input-command">
                    <textarea onchange="" placeholder="Команда"></textarea>
                </div>            
            </div>
        `)
        $("body").append(this._consoleElemDom)
    }

    /**
     * The private methods
     */

    /**
     * The global methods
     */

    show() {
        // this._consoleElemDom.css("display", "inline-block");
    }
}

export default Console