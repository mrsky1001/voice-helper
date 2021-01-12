import ConsoleDriver from "./console/consoleDriver";
import CommandManager from "./command/commandManager";
import coreFunctions from "./command/coreFunctions";

const voiceHelper = (listCommands) => {
    const commandManager = new CommandManager(listCommands, coreFunctions)
    const consoleDriver = new ConsoleDriver(commandManager)

    consoleDriver.showConsole()
}
export default voiceHelper