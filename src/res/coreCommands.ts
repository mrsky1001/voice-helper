import coreFunctions from "./coreFunctions";

export const commands = [
    {
        id: "hello",
        text: "",
        func: coreFunctions.HELLO
    },
    {
        id: "incorrect",
        text: "",
        func: coreFunctions.HELLO
    },
    {
        id: "commands",
        text: "Команды",
        func: coreFunctions.HELLO
    },
    {
        id: "reloadPage",
        text: "Перезагрузить сайт",
        func: coreFunctions.HELLO
    }
]

export default commands;