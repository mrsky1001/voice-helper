/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import { ISettings, Settings } from '../settings/settings';

class StorageManager {
  private _listMessages?: string[];
  private _settings?: ISettings;
  private readonly _name = 'voiceHelper';

  constructor() {
    this.loadStore();
  }

  public loadStore(): void {
    const store = JSON.parse(localStorage.getItem(this._name));

    if (store === null) {
      localStorage.setItem(this._name, JSON.stringify({}));
      this._listMessages = [];
      this._settings = new Settings();
    } else {
      this._listMessages = store.listMessages ? store.listMessages : [];
      this._settings = new Settings(store._settings);
    }
  }

  public saveStore(): void {
    localStorage.setItem(this._name, JSON.stringify({ listMessages: this._listMessages, settings: this._settings }));
  }

  public get listMessages(): string[] {
    this.loadStore();
    return this._listMessages;
  }

  public set listMessages(value) {
    this._listMessages = value.length >= this.settings.maxSizeListMessage ? value.slice(this.settings.maxSizeListMessage / 2) : value;
    this.saveStore();
  }

  public get settings(): ISettings {
    this.loadStore();
    return this._settings;
  }

  public set settings(value) {
    this._settings = value;
    this.saveStore();
  }
}

export default StorageManager;
