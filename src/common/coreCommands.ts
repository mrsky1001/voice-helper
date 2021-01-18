import coreFunctions from "./coreFunctions";
import {commandTypes} from "./commandTypes";

export const coreCommands = [
    {
        id: "hello",
        text: "Привет",
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
        id: "increaseHeightConsole",
        text: ["Увеличь высоту консоли", "Увеличить размер консоли"],
        description: "Увеличивает высоту консоли.",
        type: commandTypes.INFO,
        func: coreFunctions.INCREASE_CONSOLE
    },
    {
        id: "decreaseHeightConsole",
        text: ["уменьши высоту консоли", "уменьшить размер консоли"],
        description: "Уменьшает высоту консоли.",
        type: commandTypes.INFO,
        func: coreFunctions.DECREASE_CONSOLE
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