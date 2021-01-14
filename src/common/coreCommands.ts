import coreFunctions from "./coreFunctions";
import {commandTypes} from "./commandTypes";

export const coreCommands = [
    {
        id: "hello",
        text: "",
        type:commandTypes.SYSTEM,
        func: coreFunctions.HELLO
    },
    {
        id: "small",
        type:commandTypes.SYSTEM,
        isSystem:true,
        func: coreFunctions.SMALL_OR_EMPTY
    },
    {
        id: "notFound",
        type:commandTypes.SYSTEM,
        isSystem:true,
        func: coreFunctions.NOT_FOUND_COMMAND
    },
    {
        id: "commands",
        text: "Команды",
        type:commandTypes.INFO,
        func: coreFunctions.HELLO
    },
    {
        id: "reloadPage",
        text: "Перезагрузить сайт",
        type:commandTypes.INFO,
        func: coreFunctions.HELLO
    }
]

export default coreCommands;