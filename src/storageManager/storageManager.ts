import {ISettings, Settings} from "../settings/settings";

class StorageManager {
    private _listMessages?: Array<string>
    private _settings?: ISettings
    private readonly _name = "voiceHelper"

    constructor() {
        this.loadStore()
    }

    loadStore() {
        const store = JSON.parse(localStorage.getItem(this._name))

        if (store === null) {
            localStorage.setItem(this._name, JSON.stringify({}))
            this._listMessages = []
            this._settings = new Settings()
        } else {
            this._listMessages = store.listMessages ? store.listMessages : []
            this._settings = new Settings(store._settings)
        }

    }

    saveStore() {
        localStorage.setItem(this._name, JSON.stringify({listMessages: this._listMessages, settings: this._settings}))
    }

    get listMessages(): Array<string> {
        this.loadStore()
        return this._listMessages
    }

    set listMessages(value) {
        this._listMessages = value.length >= this.settings.maxSizeListMessage ? value.slice(this.settings.maxSizeListMessage / 2) : value
        this.saveStore()
    }

    get settings(): ISettings {
        this.loadStore()
        return this._settings
    }

    set settings(value) {
        this._settings = value
        this.saveStore()
    }

}

export default StorageManager