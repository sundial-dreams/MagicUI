import Electron, {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
import * as ipc from './utils/ipc';

export let mainWindow: BrowserWindow | null = null;

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

ipc.onCloseMainWindow(() => {
  mainWindow?.close();
});

ipc.onMaximizeMainWindow(() => {
  if (mainWindow?.isMaximized()) {
    mainWindow?.restore();
    return;
  }
  mainWindow?.maximize();
});

ipc.onMinimizeMainWindow(() => {
  mainWindow?.minimize();
});

async function createMainWindow() {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    minWidth: 1000,
    minHeight: 670,
    width: 1000,
    height: 670,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    backgroundColor: '#333544'
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080/dist').catch(console.error);
    // mainWindow.webContents.once('dom-ready', () => {
    //   mainWindow?.webContents.openDevTools();
    // });
  } else {
    mainWindow.loadFile(path.resolve(__dirname, '../renderer/index.html')).catch(console.error);
  }

  mainWindow.on('close', () => mainWindow = null);
  mainWindow.webContents.on('crashed', () => {
    console.error('crashed');
  });

  require('devtron').install();

}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) createMainWindow().catch(console.error);
});


