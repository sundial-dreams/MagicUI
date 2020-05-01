import Electron, { app, BrowserWindow, session } from 'electron';
import * as IpcHandler from './utils/ipcHandler';
import { loadHtmlByName } from './utils/utils';
import { CustomWindowConfig, WidgetName, WidgetType, WindowSize } from './utils/constants';
import createWidgetByName, { WidgetMap } from './widget';
import createLoginWindow from './widget/login';
import { getCookies, getUser, saveUser, setCookies } from './service/session';

let mainWindow: BrowserWindow | null = null;

async function installExtensions() {
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

function InstallIpcEventHandler() {

  IpcHandler.onMaximizeWidget((event, args: { name: string }) => {
    if (args.name === WidgetName.MAIN) {
      if (mainWindow?.isMaximized()) {
        mainWindow?.unmaximize();
        return;
      }
      mainWindow?.maximize();
    }
  });

  IpcHandler.onMinimizeWidget((event, args: { name: string }) => {
    if (args.name === WidgetName.MAIN) {
      mainWindow?.minimize();
    }
  });

  IpcHandler.onCloseWidget((event, args: { name: string }) => {
    console.log('on close', args);
    if (args.name === WidgetName.MAIN) {
      mainWindow?.close();
    }
  });

  IpcHandler.onOpenWidget((event, args: { name: string, data: any }) => {
    if (WidgetMap[args.name]) {
      if (mainWindow) {
        createWidgetByName(mainWindow, args.name, args.data);
      }
    }
  });

  IpcHandler.handleOpenMainWindow(async (event, args: any ) => {
    try {
      BrowserWindow.getFocusedWindow()?.close();
      await saveUser(args);
      await createMainWindow();
    } catch (e) {
      throw new Error(e);
    }
  });

  IpcHandler.handleFetch();

}

InstallIpcEventHandler();

async function createMainWindow() {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    ...CustomWindowConfig,
    minWidth: WindowSize.WIDTH,
    minHeight: WindowSize.HEIGHT,
    width: WindowSize.WIDTH,
    height: WindowSize.HEIGHT
  });

  loadHtmlByName(mainWindow, WidgetType.MAIN);

  mainWindow.on('close', () => mainWindow = null);
  mainWindow.webContents.on('crashed', () => {
    console.error('crashed');
  });

  mainWindow.webContents.on('did-finish-load', async () => {
    if (mainWindow) {
      let user = await getUser();
      console.log('user = ', user);
      mainWindow.webContents.send('user-data', user);
    }
  });

  require('devtron').install();

}

app.on('ready', () => {
  createLoginWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createMainWindow().catch(console.error);
});


