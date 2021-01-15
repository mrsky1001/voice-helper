import CommandManager from "../command/commandManager";
import ConsoleDriver from "../console/consoleDriver";
import {ISettings, Settings} from "../settings/settings";
import {ICommand} from "../command/command";
import coreCommands from "../common/coreCommands";
import strings from "../constants/strings";

class VoiceHelper {

    private _commandManager: CommandManager
    private _consoleDriver: ConsoleDriver
    private _settings: Settings

    init(commands: Array<ICommand>, settings?: ISettings) {
        try {
            this._settings = new Settings(settings)
            this._commandManager = new CommandManager(
                commands,
                coreCommands,
                this._settings
            )
            this._consoleDriver = new ConsoleDriver(this.commandManager)

            this.consoleDriver.showConsole()
            this.commandManager.run('hello')
        } catch (e) {
            console.error(strings.ERROR_STOP)
            console.error(e)
        }
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