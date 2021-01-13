import {addBotMessage} from "../index";
import coreMessages from "./coreMessages";

export const coreFunctions = {
    HELLO: () => {
        addBotMessage(coreMessages.HELLO)
    },
    INCORRECT_COMMAND: () => {
        console.log("Incorrect command!")
    },
    SHOW_COMMANDS: () => {
        console.log("SHOW_COMMANDS!")
    },
    RELOAD: () => {
        console.log("RELOAD!")
    }
}

export default coreFunctions