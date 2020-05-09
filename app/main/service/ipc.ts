import Electron, { ipcMain, dialog } from 'electron';
import { IpcEvent } from '../utils/constants';
import { fetch } from './fetch';
import { compileToJson } from '../complie/compile';
import compileToHtml from '../complie/compileToHtml';
import socket from './socket';
import { saveBase64ToImage, saveCodeFile } from './save';

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

export const handleCompile = () => {
  ipcMain.handle(IpcEvent.COMPILE, (event, args: {type: string, code: string}) => {
    if (args.type === 'json') {
      return compileToJson(args.code);
    }
    if (args.type === 'html') {
      return compileToHtml(args.code);
    }
  })
}

export const handleSaveFile = () => {
  ipcMain.handle(IpcEvent.SAVE_FILE, async (event, args: { type: string, data: any }) => {
    if (args.type === 'base64') {
      const value = await dialog.showSaveDialog({
        title: 'EXPORT',
        filters: [
          {name: 'image', extensions: ['png', 'jpeg', 'jpg']}
        ]
      });

      return await saveBase64ToImage(value.filePath as string, args.data);
    }
    if (args.type === 'code') {
      let filters: any[] = [];
      if (args.data.codeType === 'HTML') {
        filters = [{name: 'html', extensions: ['html', 'htm']}]
      }
      const value = await dialog.showSaveDialog({
        title: 'EXPORT',
        filters
      });
      return await saveCodeFile(value.filePath as string, args.data.code);
    }
  });
};

export const handleUserLogout = (callback: CallbackType) => {
  ipcMain.handle(IpcEvent.USER_LOGOUT, callback);
};

export const handleSaveWebGLPageWithSocket = () => {
  ipcMain.handle(IpcEvent.AUTO_SAVE_WEBGL_PAGE, (event, args) => {
    socket?.emit('auto-save-webgl-page', args);
  })
}

export const onSocketResult = (callback: Function) => {
  socket?.on('socket-result', (data: any) => {
    callback(data);
  })
}