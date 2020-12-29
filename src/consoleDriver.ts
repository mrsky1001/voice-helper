import Console from "./console/console";

class ConsoleDriver {
    private _console
    constructor() {
        this._console = new Console()
    }

    /**
     * The private methods
     */
    showConsole(){

    }
    /**
     * The global methods
     */

    start() {
        this._console.show()
    }
}

export default ConsoleDriver