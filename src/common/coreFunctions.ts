import {addBotMessage} from "../index";
import coreMessages from "./coreMessages";
import {voiceHelper} from "../voiceHelper/voiceHelper";

export const coreFunctions = {
    HELLO: () => {
        addBotMessage(coreMessages.HELLO)
    },
    SMALL_OR_EMPTY: () => {
        addBotMessage(coreMessages.SMALL_OR_EMPTY)
    },
    NOT_FOUND_COMMAND:() =>{
        addBotMessage(coreMessages.NOT_FOUND_COMMAND)
    },
    INCORRECT_COMMAND: () => {
        console.log("Incorrect command!")
    },
    SHOW_COMMANDS: () => {
        voiceHelper.commandManager.printCommands()
    },
    INCREASE_CONSOLE: () => {
        voiceHelper.consoleDriver.increaseConsole()
    },
    RELOAD: () => {
        location.reload()
        console.log("RELOAD!")
    }
}

export default coreFunctions