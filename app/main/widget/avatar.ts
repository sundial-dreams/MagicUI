import { Widget } from './widget';
import { loadHtmlByName, onCloseWidget } from '../utils/utils';
import { CustomWindowConfig, WidgetType } from '../utils/constants';
import Electron from 'electron';

export default class AvatarWidget extends Widget {
  static instance: AvatarWidget | null = null;

  static getInstance() {
    return AvatarWidget.instance ? AvatarWidget.instance : (AvatarWidget.instance = new AvatarWidget());
  }

  constructor() {
    super();
    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.AVATAR) {
        this.close();
      }
    });
  }

  create(parent?: Electron.BrowserWindow, data?: any): void {
    if (this._widget) return;
    this._widget = new Electron.BrowserWindow({
      ...CustomWindowConfig,
      parent,
      width: 450,
      height: 350,
      resizable: false,
      minimizable: false,
      maximizable: false
    });

    if (data) {
      this._widget.webContents.on('did-finish-load', () => {
        this._widget?.webContents.send('data', data);
      });
    }

    loadHtmlByName(this._widget, WidgetType.AVATAR);
    parent?.on('close', () => this.reset());
    this._widget.on('close', () => this.reset());
  }
}