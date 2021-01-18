import Console from "./console";
import CommandManager from "../command/commandManager";
import {consoleNames} from "./consoleNames";
import {Settings} from "../settings/settings";
import StorageManager from "../storageManager/storageManager";

class ConsoleDriver {
    private readonly _console: Console
    private readonly _commandManager: CommandManager
    private readonly _settings: Settings
    private readonly _storageManager: StorageManager

    constructor(commandManager: CommandManager, settings: Settings, storageManager: StorageManager) {
        this._commandManager = commandManager
        this._storageManager = storageManager
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
        this._console.increaseSize()
    }

    decreaseConsole() {
        this._console.decreaseSize()
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

    get storageManager(): StorageManager {
        return this._storageManager
    }
}

export default ConsoleDriver