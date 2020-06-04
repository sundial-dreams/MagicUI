import Electron from 'electron';
import { loadHtmlByName, onCloseWidget, onMinimizeWidget } from '../utils/utils';
import { CustomWindowConfig, WidgetType } from '../utils/constants';
import { Widget } from './widget';

export default class LoginWidget extends Widget {
  static instance: LoginWidget | null = null;
  static getInstance() {
    return LoginWidget.instance ? LoginWidget.instance :(LoginWidget.instance = new LoginWidget());
  }

  constructor() {
    super();
    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.LOGIN) {
        if (this._widget) {
          this._widget.close();
        }
      }
    });

    onMinimizeWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.LOGIN) {
        if (this._widget) {
          this._widget.minimize();
        }
      }
    });
  }

  create() {
    if (this._widget) {
      return;
    }
    this._widget = new Electron.BrowserWindow({
      ...CustomWindowConfig,
      width: 300,
      height: 370,
      resizable: false,
      maximizable: false
    });

    loadHtmlByName(this._widget, WidgetType.LOGIN);
    this._widget.on('close', () => this.reset());
  }
}