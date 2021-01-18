import {addBotMessage} from "../index";
import coreMessages from "./coreMessages";
import {voiceHelper} from "../voiceHelper/voiceHelper";
import {Command} from "../command/command";

export const coreFunctions = {
    HELLO: () => {
        addBotMessage(coreMessages.HELLO)
    },
    MATCHES_MORE_ONE: (matches: Array<Command>) => {
        let text = String(coreMessages.MATCHES_MORE_ONE)
        text += voiceHelper.commandManager.getTextCommands(matches)

        addBotMessage(text)
    },
    SMALL_OR_EMPTY: () => {
        addBotMessage(coreMessages.SMALL_OR_EMPTY)
    },
    NOT_FOUND_COMMAND: () => {
        addBotMessage(coreMessages.NOT_FOUND_COMMAND)
    },
    INCORRECT_COMMAND: () => {
        console.log("Incorrect command!")
    },
    SHOW_COMMANDS: () => {
        addBotMessage(voiceHelper.commandManager.getTextCommands())
    },
    INCREASE_CONSOLE: () => {
        voiceHelper.consoleDriver.increaseConsole()
    },
    DECREASE_CONSOLE: () => {
        voiceHelper.consoleDriver.decreaseConsole()
    },
    RELOAD: () => {
        location.reload()
        console.log("RELOAD!")
    }
}

export default coreFunctions