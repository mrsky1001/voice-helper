import Console from "./console";
import CommandManager from "../command/commandManager";
import {consoleNames} from "./consoleNames";
import {Settings} from "../settings/settings";

class ConsoleDriver {
    private readonly _console: Console
    private readonly _commandManager: CommandManager
    private readonly _settings: Settings

    constructor(commandManager: CommandManager, settings: Settings) {
        this._commandManager = commandManager
        this._console = new Console(this)
        this._settings = settings
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
    increaseConsole() {
        this._console.resize(this._settings.scaleSize)
    }

    decreaseConsole() {
        this._console.resize(-this._settings.scaleSize)
    }

    resetSizeConsole() {
        this._console.resize(-this._settings.scaleSize)
    }

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