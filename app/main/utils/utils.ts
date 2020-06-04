import Electron, { ipcMain } from 'electron';
import path from 'path';
import { IpcEvent } from './constants';

export function loadHtmlByName(window: Electron.BrowserWindow, name: string) {
  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:8080/dist/${name}.html`).catch(console.error);
    return;
  }
  window.loadFile(path.resolve(__dirname, `../renderer/${name}/index.html`)).catch(console.error);
}

type CallbackType = (event: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: any[]) => void;

export const onCloseWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.CLOSE, callback);
};

export const onMaximizeWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.MAXIMIZE, callback);
};

export const onMinimizeWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.MINIMIZE, callback);
};