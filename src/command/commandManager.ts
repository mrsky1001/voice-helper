import $ from "../common/import-jquery"
import {strings} from "../constants/strings"
import Command from "./command"

class CommandManager {
    private readonly _functions: object
    private readonly _commands: Array<Command>
    private readonly _pullCommands: Array<Command>
    private readonly _ID_EMPTY_COMMAND = "incorrect"

    constructor({commands, coreCommands, functions, coreFunctions}) {
        this._functions = {}
        this._commands = []
        this._pullCommands = []

        this.parseCommands(commands, coreCommands)
        this.parseFunctions(functions, coreFunctions)
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

            coreCommands.forEach(elem => {
                add(new Command(elem))
            })

            commands.forEach(elem => {
                add(new Command(elem))
            })
        } catch (e) {
            console.error("The commands file not parsed!")
            console.error(e)
        }
    }

    private parseFunctions(functions, coreFunctions) {
        try {
            const isNotExist = (newKey) => {
                return Object.keys(this._functions).find(key => {
                    return key === newKey
                }) === undefined
            }

            const add = (newKey, functions) => {
                if (isNotExist(newKey))
                    this._functions[newKey] = functions[newKey]
            }

            Object.keys(coreFunctions).forEach(newKey => {
                add(newKey, coreFunctions)
            })

            Object.keys(functions).forEach(newKey => {
                add(newKey, functions)
            })
        } catch
            (e) {
            console.error("The functions file not parsed!")
            console.error(e)
        }
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
        let commandMax: Command = this._commands.find((_) => {
            return _.id === this._ID_EMPTY_COMMAND
        })

        const checkSimilar = (command) => {
            const percent = CommandManager.similarText(text, command.text)

            if (percent > commandMax.matchPercent) {
                commandMax = command
            }

            console.log("Percent: " + percent + " | Command: " + text + " / CheckedCommand: " + command.text + "")
        }

        this._commands.forEach(command => {
            checkSimilar(command)
        })

        this._pullCommands.push(new Command(commandMax))
        console.log(this._pullCommands)
    }

    /**
     * getters and setters
     */
    get commands() {
        return this._commands
    }

    private static similarText(first, second, percent = true) {
        if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
            return 0;
        }

        first += '';
        second += '';

        let pos1 = 0;
        let pos2 = 0;
        let max = 0;
        let firstLength = first.length;
        let secondLength = second.length;
        let p;
        let q;
        let l;
        let sum;

        for (p = 0; p < firstLength; p++) {
            for (q = 0; q < secondLength; q++) {
                for (l = 0; p + l < firstLength && q + l < secondLength && first.charAt(p + l) === second.charAt(q + l); l++) {// eslint-disable-line max-len
                    // @todo: ^-- break up this crazy for loop and put the logic in its body
                }
                if (l > max) {
                    max = l;
                    pos1 = p;
                    pos2 = q;
                }
            }
        }

        sum = max;

        if (sum) {
            if (pos1 && pos2) {
                sum += this.similarText(first.substr(0, pos1), second.substr(0, pos2));
            }

            if (pos1 + max < firstLength && pos2 + max < secondLength) {
                sum += this.similarText(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max, secondLength - pos2 - max));
            }
        }

        if (!percent) {
            return sum;
        }

        return sum * 200 / (firstLength + secondLength);
    }
}

export default CommandManager