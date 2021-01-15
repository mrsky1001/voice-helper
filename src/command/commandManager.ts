import {strings} from "../constants/strings"
import {Command} from "./command"
import {Settings} from "../settings/settings";
import {commandTypes} from "../common/commandTypes";
import {addBotMessage} from "../index";
import stringSimilarity from "string-similarity";

class CommandManager {
    private readonly _commands: Array<Command>
    private readonly _pullCommands: Array<Command>
    private readonly _settings: Settings

    constructor(commands, coreCommands, settings) {
        this._commands = []
        this._pullCommands = []
        this._settings = settings

        this.parseCommands(commands, coreCommands)
    }

    private parseCommands(commands, coreCommands) {
        try {
            const isNotExist = (command: Command) => {
                return this._commands.find(elem => {
                    return elem.id === command.id
                }) === undefined
            }

            const add = (command: Command) => {
                if (isNotExist(command))
                    this._commands.push(command)
            }

            const prepareCommand = (elem) => {
                if (typeof elem.text === 'string')
                    elem.text = [elem.text]
                else if (elem.text === undefined)
                    elem.text = []

                add(new Command(elem))
            }

            coreCommands.forEach(elem => {
                prepareCommand(elem)
            })

            commands.forEach(elem => {
                prepareCommand(elem)
            })
        } catch (e) {
            console.error("The commands file not parsed!")
            console.error(e)
            throw e
        }
    }


    /**
     * The global methods
     */
    printCommands() {
        let text = "Список доступных команд: <br/>"
        let counter = 1

        this._commands.forEach(command => {
            if (command.type !== commandTypes.SYSTEM) {
                text += "" + counter + ") \"" + command.text[0] + "\". "

                if (command.description !== undefined)
                    text += command.description

                text += "<br/>"

                counter++
            }
        })

        addBotMessage(text)
    }

    run(name: string) {
        try {
            const command = this.commands.find(_ => _.id === name)
            console.log(command)
            command.func()
        } catch (e) {
            console.error("Command: " + name)
            console.error(strings.COMMAND_NOT_EXECUTED)
            console.error(e)
        }
    }


    parseTextToCommand(text) {
        try {
            let resCommand: Command = this._commands.find((_) => {
                return _.id === this._settings.notFoundCommandId
            })

            const isValidMessage = text.length >= this._settings.minMessageSize

            const pushMessage = (text) => {
                const checkSimilar = (command) => {
                    const percent = Math.max.apply(Math, command.text.map(str => stringSimilarity.compareTwoStrings(text, str)).map(function (o) {
                        return o
                    }))

                    if (percent > resCommand.matchPercent && percent > this._settings.minPercentSimilar) {
                        resCommand = command
                        resCommand.matchPercent = percent
                    }

                    console.log("Percent: " + percent + " | Command: \"" + text + "\" / CheckedCommand: \"" + command.text[0] + "\"")
                }

                this._commands.forEach(command => {
                    checkSimilar(command)
                })

                if (resCommand.type !== commandTypes.SYSTEM)
                    this._pullCommands.push(new Command(resCommand))

                resCommand.func()
                return true
            }

            if (isValidMessage)
                return pushMessage(text)
            else
                resCommand.func()

            return false
        } catch (e) {
            console.error("Command not parsed!")
            console.error(e)
        }
    }

    /**
     * getters and setters
     */
    get commands() {
        return this._commands
    }

    // private static similarText(first, second, percent = true) {
    //     if (first === null ||
    //         second === null ||
    //         typeof first === 'undefined' ||
    //         typeof second === 'undefined' ||
    //         String(first).trim().length === 0 ||
    //         String(second).trim().length === 0) {
    //         return 0
    //     }
    //
    //     first = first.toLowerCase()+ ''
    //     second = first.toLowerCase()+ ''
    //
    //     let pos1 = 0
    //     let pos2 = 0
    //     let max = 0
    //     let firstLength = first.length
    //     let secondLength = second.length
    //     let l
    //     let sum
    //
    //     for (let p = 0; p < firstLength; p++) {
    //         for (let q = 0; q < secondLength; q++) {
    //             for (l = 0; p + l < firstLength && q + l < secondLength && first.charAt(p + l) === second.charAt(q + l); l++) {// eslint-disable-line max-len
    //                 // @todo: ^-- break up this crazy for loop and put the logic in its body
    //             }
    //             if (l > max) {
    //                 max = l
    //                 pos1 = p
    //                 pos2 = q
    //             }
    //         }
    //     }
    //
    //     sum = max
    //
    //     if (sum) {
    //         if (pos1 && pos2) {
    //             sum += this.similarText(first.substr(0, pos1), second.substr(0, pos2))
    //         }
    //
    //         if (pos1 + max < firstLength && pos2 + max < secondLength) {
    //             sum += this.similarText(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max))
    //         }
    //     }
    //
    //     if (!percent) {
    //         return sum
    //     }
    //
    //     return sum * 200 / (firstLength + secondLength)
    // }
}

export default CommandManager