import Electron, { ipcMain } from 'electron';
import { IpcEvent } from './constants';
import { fetch } from '../service/fetch';

type CallbackType = (event: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent, ...args: any[]) => void;

export const onOpenWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.OPEN, callback);
};


export const onCloseWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.CLOSE, callback);
};


export const onMaximizeWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.MAXIMIZE, callback);
};


export const onMinimizeWidget = (callback: CallbackType) => {
  ipcMain.on(IpcEvent.MINIMIZE, callback);
};

export const handleFetch = () => {
  ipcMain.handle(IpcEvent.FETCH, async (event, args: { method: 'GET' | 'POST', url: string, data: any }) => {
    return await fetch.handle(args.method, args.url, args.data);
  });
};


export const handleOpenMainWindow = (callback: CallbackType) => {
  ipcMain.handle(IpcEvent.OPEN_MAIN_WINDOW, callback);
}