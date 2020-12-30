import "./console.scss"
import $ from '../common/import-jquery'

class Console {
    private _consoleElemDom

    constructor() {
        this._consoleElemDom = $(`<div id='console-driver'></div>`)
    }

    /**
     * The private methods
     */

    /**
     * The global methods
     */

    show() {

        $("body")
            .append(this._consoleElemDom)
            .addClass("console-driver")

    }
}

export default Console