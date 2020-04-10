import Electron, {app, BrowserWindow, ipcMain} from 'electron';
import * as path from 'path';
// @ts-ignore
import cpp from '~native/build/Release/test_addon.node';

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

// ipcMain.handle('parse_ast', async (event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
//   const [source] = args;
//   console.log('log', source);
//   return cpp.parseAST(source);
// });
//
// ipcMain.handle('filter', async (event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
//   const [array] = args;
//   return cpp.filter(array, (v: string) => v !== '');
// });
//
// ipcMain.handle('hello', async (event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
//   return cpp.hello();
// });


ipcMain.handle('parse_ast', async (event: Electron.IpcMainInvokeEvent, ...args: any[]) => {
  const [source] = args;
  return cpp.parseAST(source);
});


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


