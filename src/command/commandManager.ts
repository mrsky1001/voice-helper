import {strings} from "../constants/strings"
import {Command} from "./command"
import {Settings} from "../settings/settings";
import {commandTypes} from "../common/commandTypes";
import stringSimilarity from "string-similarity";
import coreFunctions from "../common/coreFunctions";

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

    getTextCommands(commands?: Array<Command>) {
        let text = "<br/>"

        const parse = (list: Array<Command>) => {
            let counter = 1
            list.forEach(command => {
                if (command.type !== commandTypes.SYSTEM) {
                    text += "" + counter + ") \"" + command.text[0] + "\". "

                    if (command.description !== undefined)
                        text += command.description

                    text += "<br/>"

                    counter++
                }
            })
        }

        if (commands) {
            parse(commands)
        } else {
            text = "Список доступных команд: <br/>"
            parse(this._commands)
        }

        return text
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

            const checkSimilar = (command): Command => {
                const percent = Math.max.apply(Math, command.text.map(str => stringSimilarity.compareTwoStrings(text, str)).map(function (o) {
                    return o
                }))

                command.matchPercent = percent

                if (percent > resCommand.matchPercent && percent > this._settings.minPercentSimilar) {
                    resCommand = command
                }

                console.log("Percent: " + percent + " | Command: \"" + text + "\" / CheckedCommand: \"" + command.text[0] + "\"")
                return command
            }

            const checkMatches = (listPercentMatches, command) => {
                const matches = []

                listPercentMatches.forEach((elem) => {
                    if (command.matchPercent - elem.matchPercent <= this._settings.matchesCoefficient)
                        matches.push(command)
                })

                return matches
            }


            const pushMessage = () => {
                const listPercentMatches: Array<Command> = this._commands.map(command => {
                    return checkSimilar(command)
                })

                const matches = checkMatches(listPercentMatches, resCommand)

                if (matches.length > 1) {
                    coreFunctions.MATCHES_MORE_ONE(matches)
                }

                if (resCommand.type !== commandTypes.SYSTEM)
                    this._pullCommands.push(new Command(resCommand))

                resCommand.func()
                return true
            }

            if (isValidMessage)
                return pushMessage()
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
}

export default CommandManager