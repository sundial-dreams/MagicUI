import { BrowserWindow, dialog, ipcMain } from 'electron';
import { IpcEvent } from '../utils/constants';
import { fetch } from './fetch';
import { JsonCompiler } from '../complie/compile';
import { HtmlCompiler } from '../complie/compileToHtml';
import socket from './socket';
import { mkdir, saveBase64ToImage, saveCodeFile } from './save';
import createSubWidgetByName, { Login, Main, WidgetMap } from '../widget';
import { clearUser, saveUser } from './session';
import { ReactCompiler } from '../complie/compileToReact';

export const handleOpenWidget = () => {
  ipcMain.on(IpcEvent.OPEN, (event, args: {name: string, data: any}) => {
    if (WidgetMap[args.name]) {
      if (BrowserWindow.getFocusedWindow()) {
        createSubWidgetByName(BrowserWindow.getFocusedWindow() as BrowserWindow, args.name, args.data);
      }
    }
  });
};

export const handleFetch = () => {
  ipcMain.handle(IpcEvent.FETCH, async (event, args: { method: 'GET' | 'POST', url: string, data: any }) => {
    return await fetch.handle(args.method, args.url, args.data);
  });
};


export const handleUserLogin = () => {
  ipcMain.handle(IpcEvent.USER_LOGIN, async (event, args) => {
    try {
      BrowserWindow.getFocusedWindow()?.close();
      await saveUser(args);
      Main.create();
    } catch (e) {
      throw new Error(e);
    }
  });
}

export const handleUpdateUser = () => {
  ipcMain.handle(IpcEvent.UPDATE_USER, async (event, args: {email: string, nickname: string, password: string, avatar: string}) => {
    try {
      await saveUser(args);
    } catch (e) {  }
  })
};

export const handleCompile = () => {
  const htmlCompiler = new HtmlCompiler();
  const jsonCompiler = new JsonCompiler();
  const reactCompiler = new ReactCompiler();
  const compiler = {
    html: htmlCompiler,
    json: jsonCompiler,
    react: reactCompiler
  };

  ipcMain.handle(IpcEvent.COMPILE, (event, args: {type: string, code: string}) => {
    return (compiler as any)[args.type].compile(args.code);
  })
}

export const handleOpenFile = () => {
  ipcMain.handle(IpcEvent.OPEN_FILE, async (event, args: { type: string }) => {
    if (args.type === 'image') {
      const value = await dialog.showOpenDialog({
        title: 'OPEN',
        filters: [
          { name: 'image', extensions: ['png', 'jpeg', 'jpg'] }
        ]
      });

      return value;
    }
    return null;
  });
};

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
        filters = [{ name: 'html', extensions: ['html', 'htm'] }]
        const value = await dialog.showSaveDialog({
          title: 'EXPORT',
          filters
        });
        return await saveCodeFile(value.filePath as string, args.data.code[0]);
      }
      if (args.data.codeType === 'REACT') {
        filters = [{ name: 'react', extensions: [] }]
        const value = await dialog.showSaveDialog({
          title: 'EXPORT',
          filters
        });
        await mkdir(value.filePath as string);
        await saveCodeFile(`${value.filePath}/index.jsx`, args.data.code[0]);
        await saveCodeFile(`${value.filePath}/index.scss`, args.data.code[1]);
        return;
      }
    }
  });
};

export const handleUserLogout = () => {
  ipcMain.handle(IpcEvent.USER_LOGOUT, async (event, args) => {
    if (Main.isCreate()) {
      Main.close();
      await clearUser();
      Login.create();
    }
  });
};

export const handleSaveWebGLPageWithSocket = () => {
  ipcMain.handle(IpcEvent.AUTO_SAVE_WEBGL_PAGE, (event, args) => {
    socket?.emit('auto-save-webgl-page', args);
  })
}

export const handleSocketResult = () => {
  socket?.on('socket-result', (data: any) => {
    if (Main.isCreate()) {
      Main.widget?.webContents.send('socket-result', data);
    }
  })
}

export const handles = [
  handleOpenFile,
  handleSaveWebGLPageWithSocket,
  handleUserLogout,
  handleSaveFile,
  handleCompile,
  handleUserLogin,
  handleFetch,
  handleSocketResult,
  handleOpenWidget,
  handleUpdateUser
];

export function InstallIpcEventHandler() {
  handles.forEach(handle => handle());
}