import {voiceHelper} from "./voiceHelper/voiceHelper"
import {ISettings} from "./settings/settings";
import {ICommand} from "./command/command";
import "../node_modules/font-awesome/scss/font-awesome.scss";

export const startVoiceHelper = (commands: Array<ICommand>, settings?: ISettings) => {
    voiceHelper.init(commands, settings)
}

export const addBotMessage = (message) => {
    voiceHelper.consoleDriver.addBotMessage(message)
}

export default {startVoiceHelper, addBotMessage}