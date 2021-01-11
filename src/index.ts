import ConsoleDriver from "./console/consoleDriver";
import CommandManager from "./command/commandManager";

const voiceHelper = (listCommands) => {
    console.log(listCommands)
    const commandManager = new CommandManager(listCommands)
    const consoleDriver = new ConsoleDriver(commandManager)

    consoleDriver.showConsole()
}
export default voiceHelper