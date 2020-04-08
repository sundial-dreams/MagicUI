import {app, BrowserWindow} from 'electron';
import * as path from 'path';

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

console.log(process.env.NODE_ENV);

async function createMainWindow() {
  if (process.env.NODE_ENV === 'development') {
    await installExtensions();
  }
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
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

