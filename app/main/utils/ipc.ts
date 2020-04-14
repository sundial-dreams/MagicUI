import Electron, { ipcMain } from 'electron';
import { IpcEvent } from './constants';

export const onCloseMainWindow = (callback: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => void) => {
  ipcMain.handle(IpcEvent.CLOSE_WINDOW, callback);
};


export const onMinimizeMainWindow = (callback: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => void) => {
  ipcMain.handle(IpcEvent.MINIMIZE_WINDOW, callback);
};

export const onMaximizeMainWindow = (callback: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => void) => {
  ipcMain.handle(IpcEvent.MAXIMIZE_WINDOW, callback);
};