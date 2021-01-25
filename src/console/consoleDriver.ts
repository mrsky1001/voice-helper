/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

import CommandManager from '../command/commandManager';
import {Settings} from '../settings/settings';
import StorageManager from '../storageManager/storageManager';
import Console from './console';
import {consoleNames} from './consoleNames';

class ConsoleDriver {
    private readonly _console: Console;
    private readonly _commandManager: CommandManager;
    private readonly _settings: Settings;
    private readonly _storageManager: StorageManager;

    constructor(commandManager: CommandManager, settings: Settings, storageManager: StorageManager) {
        this._commandManager = commandManager;
        this._storageManager = storageManager;
        this._console = new Console(this);
        this._settings = settings;
    }

    /**
     * The global methods
     */
    public commandCallback(text): void {
        this.addCommandMessage(String(text));
        this._commandManager.parseTextToCommand(text);
    }

    public increaseConsole(): void {
        this._console.increaseSize();
    }

    public decreaseConsole(): void {
        this._console.decreaseSize();
    }

    public closeConsole(): void {
        this._console.close();
    }

    public showConsole(): void {
        this._console.show();
    }

    public addBotMessage(message: string): void {
        this._console.addMessage(consoleNames.BOT_MESSAGE, message);
        this._console.updateScroll();
    }

    public addCommandMessage(message: string): void {
        this._console.addMessage(consoleNames.COMMAND_MESSAGE, message);
        this._console.updateScroll();
    }

    public createConsole(): void {
        this._console.create();
    }

    public get storageManager(): StorageManager {
        return this._storageManager;
    }
}

export default ConsoleDriver;
