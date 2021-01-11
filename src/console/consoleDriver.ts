import Console from "./console";
import CommandManager from "../command/commandManager";

class ConsoleDriver {
    private _console: Console
    private readonly _commandManager: CommandManager

    constructor(commandManager) {
        console.log(commandManager)

        this._commandManager = commandManager
        this._console = new Console(this)
    }

    /**
     * The private methods
     */
    public commandCallback(text) {
        console.log(text)
        console.log( this._commandManager)
        this._commandManager.parseTextToCommand(text)
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

    showConsole() {
        this._console.show()
    }

}

export default ConsoleDriver