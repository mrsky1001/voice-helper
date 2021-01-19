/*
 * Copyright (c) 2021.  Author: Nikita Kolyada. Email: nikita.nk16@yandex.ru
 */

interface ISettings {
  minMessageSize?: number;
  matchesCoefficient?: number;
  minPercentSimilar?: number;
  scaleSize?: number;
  width?: string;
  height?: string;
  maxSizeListMessage?: number;
}

class Settings implements ISettings {
  private readonly _minMessageSize: number;
  private readonly _minPercentSimilar: number;
  private readonly _matchesCoefficient: number;
  private readonly _height: string;
  private readonly _width: string;
  private readonly _maxSizeListMessage: number;
  private readonly _notFoundCommandId = 'notFound';

  constructor(
    settings: ISettings = {
      minMessageSize: 5,
      minPercentSimilar: 0.4,
      matchesCoefficient: 0.05,
      scaleSize: 100,
      width: '20%',
      height: '25%',
      maxSizeListMessage: 100,
    },
  ) {
    this._minMessageSize = settings.minMessageSize;
    this._matchesCoefficient = settings.matchesCoefficient;
    this._minPercentSimilar = settings.minPercentSimilar;
    this._height = settings.height;
    this._width = settings.width;
    this._maxSizeListMessage = settings.maxSizeListMessage;
  }

  public get matchesCoefficient(): number {
    return this._matchesCoefficient;
  }

  public get maxSizeListMessage(): number {
    return this._maxSizeListMessage;
  }

  public get height(): string {
    return this._height;
  }

  public get minMessageSize(): number {
    return this._minMessageSize;
  }

  public get minPercentSimilar(): number {
    return this._minPercentSimilar;
  }

  public get notFoundCommandId(): string {
    return this._notFoundCommandId;
  }
}

export { ISettings, Settings };
