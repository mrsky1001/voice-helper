import {startVoiceHelper, addBotMessage} from "./src/index"
import {commands} from "./commands.json"
import {commandFunctions} from "./commandFunctions.ts"

startVoiceHelper(commands, commandFunctions)
addBotMessage("Здравствуйте! Я голосовой ")