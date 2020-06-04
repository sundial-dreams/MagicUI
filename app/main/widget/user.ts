import Electron from 'electron';
import { loadHtmlByName, onCloseWidget, onMinimizeWidget } from '../utils/utils';
import { CustomWindowConfig, WidgetType } from '../utils/constants';
import { Widget } from './widget';

export default class UserWidget extends Widget {
  static instance: UserWidget | null = null;
  static getInstance() {
    return UserWidget.instance ? UserWidget.instance : (UserWidget.instance = new UserWidget())
  }

  constructor() {
    super();
    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.USER) {
        if (this._widget) {
          this._widget.close();
        }
      }
    });

    onMinimizeWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.USER) {
        if (this._widget) {
          this._widget.minimize();
        }
      }
    });
  }
  create(parent?: Electron.BrowserWindow, data?: any) {
    if (this._widget) return;
    this._widget = new Electron.BrowserWindow({
      ...CustomWindowConfig,
      width: 310,
      height: 380,
      resizable: false,
      maximizable: false,
      parent
    });

    loadHtmlByName(this._widget, WidgetType.USER);

    if (data) {
      this._widget.webContents.on('did-finish-load', () => {
        this._widget?.webContents.send('user-data', data);
      });
    }
    parent?.on('close', () => this.reset());
    this._widget.on('close', () => this.reset());
  }
}