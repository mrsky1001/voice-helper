import "./console.scss"
import jQuery from "jquery";

class Console {
    // private _consoleElemDom

    constructor() {
    }

    /**
     * The private methods
     */

    /**
     * The global methods
     */

    show() {
        jQuery(($) =>{
            $("body")
                .add(`<div id='#console-driver'> Hello world</div>`)
                .addClass("console-driver")
        })
    }
}

export default Console