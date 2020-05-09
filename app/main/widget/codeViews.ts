import Electron from 'electron';
import { loadHtmlByName } from '../utils/utils';
import { CustomWindowConfig, WidgetName, WidgetType } from '../utils/constants';
import { onCloseWidget } from '../service/ipc';

let codeViewsWindow: Electron.BrowserWindow | null = null;

onCloseWidget((event, args: { name: string }) => {
  if (args.name === WidgetName.CODE_VIEWS) {
    if (codeViewsWindow) {
      codeViewsWindow.close();
    }
  }
});

export default function createCodeViewsWidget(parent: Electron.BrowserWindow, data: any = null) {
  if (codeViewsWindow) return;

  codeViewsWindow = new Electron.BrowserWindow({
    ...CustomWindowConfig,
    parent,
    width: 550,
    height: 600,
    resizable: false,
    minimizable: false,
    maximizable: false
  });

  loadHtmlByName(codeViewsWindow, WidgetType.CODE_VIEWS);

  if (data) {
    codeViewsWindow.webContents.on('did-finish-load', () => {
      codeViewsWindow?.webContents.send('code', data);
    });
  }

  parent.on('close', () => codeViewsWindow = null);
  codeViewsWindow.on('close', () => codeViewsWindow = null);
}