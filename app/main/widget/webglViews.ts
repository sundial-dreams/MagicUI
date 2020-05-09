import Electron from 'electron';
import {loadHtmlByName} from '../utils/utils';
import { CustomWindowConfig, WidgetName, WidgetType } from '../utils/constants';
import { onCloseWidget } from '../service/ipc';

let webglViewsWindow: Electron.BrowserWindow | null = null;


onCloseWidget((event, args: {name: string}) => {
  if (args.name === WidgetName.WEBGL_VIEWS) {
    if (webglViewsWindow) {
      webglViewsWindow.close();
    }
  }
})

export default function createWebGLViewsWidget(parent: Electron.BrowserWindow, data: any = null) {
  if (webglViewsWindow) return;

  webglViewsWindow = new Electron.BrowserWindow({
    ...CustomWindowConfig,
    parent,
    width: 750,
    height: 550,
    resizable: false,
    minimizable: false,
    maximizable: false
  });

  loadHtmlByName(webglViewsWindow, WidgetType.WEBGL_VIEWS);
  if (data) {
    webglViewsWindow.webContents.on('did-finish-load', () => {
      webglViewsWindow?.webContents.send('jsonCode', data);
    })
  }
  parent.on('close', () => webglViewsWindow = null);
  webglViewsWindow.on('close', () => webglViewsWindow = null)
}