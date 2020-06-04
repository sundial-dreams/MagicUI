import Electron from 'electron';
import { loadHtmlByName, onCloseWidget } from '../utils/utils';
import { CustomWindowConfig, WidgetType } from '../utils/constants';
import { Widget } from './widget';


export default class WebGLWidget extends Widget {
  static instance: WebGLWidget | null = null;

  static getInstance() {
    return WebGLWidget.instance ? WebGLWidget.instance : (WebGLWidget.instance = new WebGLWidget());
  }

  constructor() {
    super();
    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.WEBGL) {
        if (this._widget) {
          this._widget.close();
        }
      }
    });
  }

  create(parent?: Electron.BrowserWindow, data?: any) {
    if (this._widget) return;

    this._widget = new Electron.BrowserWindow({
      ...CustomWindowConfig,
      parent,
      width: 750,
      height: 550,
      resizable: false,
      minimizable: false,
      maximizable: false
    });

    loadHtmlByName(this._widget, WidgetType.WEBGL);
    if (data) {
      this._widget.webContents.on('did-finish-load', () => {
        this._widget?.webContents.send('jsonCode', data);
      });
    }
    parent?.on('close', () => this.reset());
    this._widget.on('close', () => this.reset());
  }
}