import Console from "./console";
import CommandManager from "../command/commandManager";
import {consoleNames} from "./consoleNames";

class ConsoleDriver {
    private readonly _console: Console
    private readonly _commandManager: CommandManager

    constructor(commandManager) {
        this._commandManager = commandManager
        this._console = new Console(this)
    }

    /**
     * The private methods
     */
    public commandCallback(text) {
        this.addCommandMessage(text)
        this._commandManager.parseTextToCommand(text)
    }


    /**
     * The global methods
     */
    addBotMessage(message) {
        this._console.addMessage(consoleNames.BOT_MESSAGE, message)
        this._console.updateScroll()
    }

    addCommandMessage(message) {
        this._console.addMessage(consoleNames.COMMAND_MESSAGE, message)
        this._console.updateScroll()
    }

    showConsole() {
        this._console.show()
    }

}

export default ConsoleDriver