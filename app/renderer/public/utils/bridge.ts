import Electron, { ipcRenderer } from 'electron';
import { IpcEvent } from './constants';

type FetchCallType = {
  method: 'GET' | 'POST',
  data: any,
  url: string
};

const Bridge = function () {

  return {
    fetch(method: 'GET' | 'POST', url: string, data: any = null) {
      return ipcRenderer.invoke(IpcEvent.FETCH, {
        method,
        data,
        url
      }).catch(console.error);
    },
    request(params: { method: 'GET' | 'POST', url: string, data: any }) {
      return ipcRenderer.invoke(IpcEvent.FETCH, params).catch(console.error);
    },
    open(name: string, data: any = null) {
      ipcRenderer.send(IpcEvent.OPEN, {
        name, data
      });
    },
    close(name: string) {
      ipcRenderer.send(IpcEvent.CLOSE, { name });
    },
    maximize(name: string) {
      ipcRenderer.send(IpcEvent.MAXIMIZE, { name });
    },
    minimize(name: string) {
      ipcRenderer.send(IpcEvent.MINIMIZE, { name });
    },
    openMainWindow(data: any) {
      ipcRenderer.invoke(IpcEvent.OPEN_MAIN_WINDOW, data).catch(console.error);
    },
    compile(type: string, code: string) {
      return ipcRenderer.invoke(IpcEvent.COMPILE, { type, code });
    },
    saveFile(type: string, data: any) {
      return ipcRenderer.invoke(IpcEvent.SAVE_FILE, { type, data })
    },
    logout() {
      return ipcRenderer.invoke(IpcEvent.USER_LOGOUT);
    }
  };
}();

export default Bridge;

