import Electron from 'electron';
import { loadHtmlByName, onCloseWidget } from '../utils/utils';
import { CustomWindowConfig, WidgetType } from '../utils/constants';
import { Widget } from './widget';

export default class CodeWidget extends Widget {
  static instance: CodeWidget | null = null;

  static getInstance() {
    return CodeWidget.instance ? CodeWidget.instance : (CodeWidget.instance = new CodeWidget());
  }

  constructor() {
    super();
    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.CODE) {
        if (this._widget) {
          this._widget.close();
        }
      }
    });
  }

  create(parent?: Electron.BrowserWindow, data?: any): void {
    if (this._widget) return;
    this._widget = new Electron.BrowserWindow({
      ...CustomWindowConfig,
      parent,
      width: 550,
      height: 600,
      resizable: false,
      minimizable: false,
      maximizable: false
    });

    loadHtmlByName(this._widget, WidgetType.CODE);

    if (data) {
      this._widget.webContents.on('did-finish-load', () => {
        this._widget?.webContents.send('code', data);
      });
    }
    parent?.on('close', () => this.reset());
    this._widget.on('close', () => this.reset());
  }
}