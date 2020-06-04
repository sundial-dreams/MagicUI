import { EventEmitter } from 'events';

export interface IWidget {
  create(parent?: Electron.BrowserWindow, data?: any): void;

  isCreate(): boolean;

  reset(): void;

  close(): void;

  hide(): void;

  show(): void;
}

export class Widget extends EventEmitter implements IWidget {
  protected _widget: Electron.BrowserWindow | null = null;

  create(parent?: Electron.BrowserWindow, data?: any): void {
  }

  isCreate(): boolean {
    return this._widget !== null;
  }

  reset(): void {
    this._widget = null;
  }

  get widget() {
    return this._widget;
  }

  close(): void {
    this._widget?.close();
    this.reset();
  }

  hide(): void {
    this._widget?.hide();
  }

  show(): void {
    this._widget?.show();
  }
}