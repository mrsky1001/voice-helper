import ConsoleDriver from "./console/consoleDriver"
import CommandManager from "./command/commandManager"
import * as coreFunctions from "./res/coreFunctions"
import * as commandsJson from "./res/coreCommands.json"

class VoiceHelper {
    private _commandManager: CommandManager
    private _consoleDriver: ConsoleDriver

    init(commands, functions) {
        this.commandManager = new CommandManager({
            commands: commands,
            coreCommands: commandsJson.commands,
            functions: functions,
            coreFunctions: coreFunctions.default.coreFunctions
        })

        this.consoleDriver = new ConsoleDriver(this.commandManager)
        this.consoleDriver.showConsole()
        this.commandManager.run('hello')
    }



    get commandManager() {
        return this._commandManager;
    }

    set commandManager(value) {
        this._commandManager = value;
    }

    get consoleDriver() {
        return this._consoleDriver;
    }

    set consoleDriver(value) {
        this._consoleDriver = value;
    }
}

const voiceHelper = new VoiceHelper()

export const startVoiceHelper = (commands, functions) => {
    voiceHelper.init(commands, functions)
}

export const addBotMessage = (message) => {
    voiceHelper.consoleDriver.addBotMessage(message)
}

export default {startVoiceHelper, addBotMessage}