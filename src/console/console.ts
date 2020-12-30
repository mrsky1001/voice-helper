import "./console.scss"
import $ from "../common/import-jquery"

class Console {
    private readonly _consoleElemDom

    constructor() {
        this._consoleElemDom = $(`
            <div id="console-driver">
                <div id="text-container">
                    <p id="text-line-0">Example text</p>
                </div>
                <div id="input-command">
                    <input onchange="" value="" placeholder="Команда"/>
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