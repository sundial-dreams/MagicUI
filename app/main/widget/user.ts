import Electron from 'electron';
import { loadHtmlByName } from '../utils/utils';
import { CustomWindowConfig, WidgetName, WidgetType } from '../utils/constants';
import { onCloseWidget, onMinimizeWidget } from '../service/ipc';

let userWidget: Electron.BrowserWindow | null = null;

onCloseWidget((event, args: { name: string }) => {
  if (args.name === WidgetName.USER) {
    if (userWidget) {
      userWidget.close();
    }
  }
});

onMinimizeWidget((event, args: { name: string }) => {
  if (args.name === WidgetName.USER) {
    if (userWidget) {
      userWidget.minimize();
    }
  }
});

export default function createUserWidget(parent: Electron.BrowserWindow, data: any = null) {
  if (userWidget) return;
  userWidget = new Electron.BrowserWindow({
    ...CustomWindowConfig,
    width: 310,
    height: 380,
    resizable: false,
    maximizable: false,
    parent
  });

  loadHtmlByName(userWidget, WidgetType.USER);

  if (data) {
    userWidget.webContents.on('did-finish-load', () => {
      userWidget?.webContents.send('user-data', data);
    });
  }
  parent.on('close', () => userWidget = null);
  userWidget.on('close', () => userWidget = null);
}