import Electron from 'electron';
import { loadHtmlByName } from '../utils/utils';
import { CustomWindowConfig, WidgetName, WidgetType } from '../utils/constants';
import { onCloseWidget, onMinimizeWidget } from '../utils/ipcHandler';

let loginWindow: Electron.BrowserWindow | null = null;

onCloseWidget((event, args: { name: string }) => {
  if (args.name === WidgetName.LOGIN) {
    if (loginWindow) {
      loginWindow.close();
    }
  }
});

onMinimizeWidget((event, args: { name: string }) => {
  if (args.name === WidgetName.LOGIN) {
    if (loginWindow) {
      loginWindow.minimize();
    }
  }
});

export default function createLoginWindow() {
  if (loginWindow) return;
  loginWindow = new Electron.BrowserWindow({
    ...CustomWindowConfig,
    width: 300,
    height: 370,
    resizable: false,
    maximizable: false
  });

  loadHtmlByName(loginWindow, WidgetType.LOGIN);

  loginWindow.on('close', () => loginWindow = null);
}