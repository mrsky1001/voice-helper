import coreFunctions from "./coreFunctions";
import {commandTypes} from "./commandTypes";

export const coreCommands = [
    {
        id: "hello",
        text: "",
        type: commandTypes.SYSTEM,
        func: coreFunctions.HELLO
    },
    {
        id: "small",
        type: commandTypes.SYSTEM,
        isSystem: true,
        func: coreFunctions.SMALL_OR_EMPTY
    },
    {
        id: "notFound",
        type: commandTypes.SYSTEM,
        isSystem: true,
        func: coreFunctions.NOT_FOUND_COMMAND
    },
    {
        id: "commands",
        text: "Список команд",
        description: "Показывает список доступных комманд для вызова через консоль или голосом.",
        type: commandTypes.INFO,
        func: coreFunctions.SHOW_COMMANDS
    },
    {
        id: "resizeHeightConsole",
        text: ["Увеличь высоту консоли", "Увеличить размер консоли"],
        description: "Показывает список доступных комманд для вызова через консоль или голосом.",
        type: commandTypes.INFO,
        func: coreFunctions.INCREASE_CONSOLE
    },
    {
        id: "reloadPage",
        text: "Перезагрузить сайт",
        description: "Перезагрузка сайта.",
        type: commandTypes.INFO,
        func: coreFunctions.RELOAD
    }
]

export default coreCommands;