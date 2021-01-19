/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import cloneDeep from 'lodash.clonedeep';
import { ICommand } from '../command/command';
import CommandManager from '../command/commandManager';
import coreCommands from '../common/coreCommands';
import ConsoleDriver from '../console/consoleDriver';
import strings from '../constants/strings';
import { ISettings, Settings } from '../settings/settings';
import StorageManager from '../storageManager/storageManager';

class VoiceHelper {
  private _commandManager: CommandManager;
  private _consoleDriver: ConsoleDriver;
  private _settings: Settings;
  private _storageManager: StorageManager;

  public init(commands: ICommand[], settings?: ISettings): void {
    try {
      this._storageManager = new StorageManager();
      const tempSettings = settings ? cloneDeep(settings, this._storageManager.settings) : this._storageManager.settings;
      this._settings = new Settings(tempSettings);
      this._commandManager = new CommandManager(commands, coreCommands, this._settings);
      this._consoleDriver = new ConsoleDriver(this.commandManager, this._settings, this._storageManager);

      this.consoleDriver.createConsole();
      this.commandManager.run('hello');
    } catch (e) {
      console.error(strings.ERROR_STOP);
      console.error(e);
    }
  }

  public get storageManager(): StorageManager {
    return this._storageManager;
  }

  public get settings(): Settings {
    return this._settings;
  }

  public get commandManager(): CommandManager {
    return this._commandManager;
  }

  public get consoleDriver(): ConsoleDriver {
    return this._consoleDriver;
  }
}

const voiceHelper = new VoiceHelper();

export { voiceHelper };
