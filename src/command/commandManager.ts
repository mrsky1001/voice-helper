import $ from "../common/import-jquery"
import {strings} from "../constants/strings"
import Command from "./command"

class CommandManager {
    private readonly _functions: object
    private readonly _commands: Array<Command>
    private readonly _pullCommands: Array<Command>

    constructor({commands, coreCommands, functions, coreFunctions}) {
        this._functions = {}
        this._commands = []
        this._pullCommands = []

        this.parseCommands(commands, coreCommands)
        this.parseFunctions(functions, coreFunctions)
    }

    private parseCommands(commands, coreCommands) {
        try {
            const isExist = (command: Command) => {
                return this._commands.find(elem => {
                    return elem.id === command.id
                }) !== undefined
            }

            const add = (command: Command) => {
                if (isExist(command))
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

    private parseFunctions(functions: object, coreFunctions: object) {
        try {
            const isExist = (newKey) => {
                return Object.keys(this._functions).find(key => {
                    return key === newKey
                }) !== undefined
            }

            const add = (newKey, functions) => {
                if (isExist(newKey))
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


    private getScript(filename) {
        return $.getScript(filename, () => {
            console.log(strings.FILE_LOADED + filename)
        });
    }

    public

    parseTextToCommand(text) {
        let commandMax: Command = null

        this._pullCommands.forEach(command => {
            const percent = CommandManager.similarText(command.text, text)

            if (commandMax && percent > commandMax.matchPercent) {
                commandMax = command
            }

            console.log("Percent: " + percent + " | Command: " + text + " / CheckedCommand: " + command.text + "")
        })

        this._pullCommands.push(new Command(commandMax))
        console.log(this._pullCommands)
    }

    /**
     * getters and setters
     */
    get listCommands() {
        return this._listCommands
    }

    /**
     * @param {string} s1 Исходная строка
     * @param {string} s2 Сравниваемая строка
     * @param {object} [costs] Веса операций { [replace], [replaceCase], [insert], [remove] }
     * @return {number} Расстояние Левенштейна
     */
    private static

    levenshtein(s1, s2, costs) {
        let i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
        l1 = s1.length;
        l2 = s2.length;

        costs = costs || {};
        let cr = costs.replace || 1;
        let cri = costs.replaceCase || costs.replace || 1;
        let ci = costs.insert || 1;
        let cd = costs.remove || 1;

        cutHalf = flip = Math.max(l1, l2);

        let minCost = Math.min(cd, ci, cr);
        let minD = Math.max(minCost, (l1 - l2) * cd);
        let minI = Math.max(minCost, (l2 - l1) * ci);
        let buf = new Array((cutHalf * 2) - 1);

        for (i = 0; i <= l2; ++i) {
            buf[i] = i * minD;
        }

        for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
            ch = s1[i];
            chl = ch.toLowerCase();

            buf[flip] = (i + 1) * minI;

            ii = flip;
            ii2 = cutHalf - flip;

            for (j = 0; j < l2; ++j, ++ii, ++ii2) {
                cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
                buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
            }
        }
        return buf[l2 + cutHalf - flip];
    }

    private static

    tanimoto(s1, s2) {
        s1 = Array.from(s1);
        s2 = Array.from(s2);

        let a = s1.length;
        let b = s2.length;
        let c = 0;

        for (let sym of s1) {
            let index = s2.indexOf(sym);
            if (index > -1) {
                s2.splice(index, 1);
                c += 1;
            }
        }
        return c / (a + b - c)
    }

    private static

    similarText(first, second, percent = true) {
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