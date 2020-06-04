import { BrowserWindow } from 'electron';
import { CustomWindowConfig, WidgetType, WindowSize } from '../utils/constants';
import { loadHtmlByName, onCloseWidget, onMaximizeWidget, onMinimizeWidget } from '../utils/utils';
import { getUser } from '../service/session';
import { Widget } from './widget';

function installExtensions() {
  const {
    default: installExtensions,
    REACT_DEVELOPER_TOOLS,
    REACT_PERF,
    REDUX_DEVTOOLS
  } = require('electron-devtools-installer');
  try {
    installExtensions([REACT_DEVELOPER_TOOLS, REACT_PERF, REDUX_DEVTOOLS]);
  } catch (e) {
    console.error(e);
  }
}

export default class MainWidget extends Widget {
  static instance: MainWidget | null = null;
  static getInstance() {
    return MainWidget.instance ? MainWidget.instance : (MainWidget.instance = new MainWidget());
  }

  constructor() {
    super();
    onMaximizeWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.MAIN) {
        if (this._widget) {
          if (this._widget.isMaximized()) {
            this._widget.unmaximize();
            return;
          }
          this._widget.maximize();
        }
      }
    });

    onMinimizeWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.MAIN) {
        if (this._widget) {
          this._widget.minimize();
        }
      }
    });

    onCloseWidget((event, args: { name: string }) => {
      if (args.name === WidgetType.MAIN) {
        if (this._widget) {
          this._widget.close();
        }
      }
    });
  }
  create() {
    if (process.env.NODE_ENV === 'development') {
      installExtensions();
    }
    if (this._widget) {
      return;
    }

    this._widget = new BrowserWindow({
      ...CustomWindowConfig,
      minWidth: WindowSize.WIDTH,
      minHeight: WindowSize.HEIGHT,
      width: WindowSize.WIDTH,
      height: WindowSize.HEIGHT
    });

    loadHtmlByName(this._widget, WidgetType.MAIN);

    this._widget.on('close', () => this.reset());
    this._widget.webContents.on('crashed', () => {
      console.error('crashed');
    });

    this._widget.webContents.on('did-finish-load', async () => {
      if (this._widget) {
        let user = await getUser();
        this._widget?.webContents.send('user-data', user);
      }
    });
    require('devtron').install();
  }
}