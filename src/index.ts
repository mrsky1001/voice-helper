import ConsoleDriver from "./consoleDriver";

const voiceHelper = (e:string) => {
    console.log("voiceHelper")
    const consoleDriver = new ConsoleDriver()
    consoleDriver.start()
}
export default voiceHelper