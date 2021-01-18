import CommandManager from "../command/commandManager";
import ConsoleDriver from "../console/consoleDriver";
import {ISettings, Settings} from "../settings/settings";
import {ICommand} from "../command/command";
import coreCommands from "../common/coreCommands";
import strings from "../constants/strings";
import StorageManager from "../storageManager/storageManager";

console.log(coreCommands)

class VoiceHelper {

    private _commandManager: CommandManager
    private _consoleDriver: ConsoleDriver
    private _settings: Settings
    private _storageManager: StorageManager

    init(commands: Array<ICommand>, settings?: ISettings) {
        try {
            this._storageManager = new StorageManager()

            const tempSettings = settings ? Object.assign(settings, this._storageManager.settings) : this._storageManager.settings
            this._settings = new Settings(tempSettings)

            this._commandManager = new CommandManager(
                commands,
                coreCommands,
                this._settings
            )

            this._consoleDriver = new ConsoleDriver(this.commandManager, this._settings, this._storageManager)

            this.consoleDriver.showConsole()
            this.commandManager.run('hello')
        } catch (e) {
            console.error(strings.ERROR_STOP)
            console.error(e)
        }
    }

    get storageManager(): StorageManager {
        return this._storageManager;
    }


    get settings(): Settings {
        return this._settings;
    }

    get commandManager() {
        return this._commandManager;
    }

    get consoleDriver() {
        return this._consoleDriver;
    }
}

const voiceHelper = new VoiceHelper()

export {voiceHelper}