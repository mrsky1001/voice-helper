import Console from "./console/console";

class ConsoleDriver {
    private _console

    constructor() {
        this._console = new Console(this.commandCallback)
    }

    /**
     * The private methods
     */
    commandCallback(e) {
        console.log(e)
    }

    showConsole() {

    }

    /**
     * The global methods
     */
    addBotMessage(message) {
        this._console.addMessage("bot-message-line", message)
        this._console.updateScroll()
    }

    addCommandMessage(message) {
        this._console.addMessage("command-message-line", message)
        this._console.updateScroll()
    }

    start() {
        this._console.show()
    }
}

export default ConsoleDriver