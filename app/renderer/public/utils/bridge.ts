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
    open(name: string, data: any = null) {
      ipcRenderer.send(IpcEvent.OPEN, {
        name,data
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
    openMainWindow(data: {email:string, password: string, avatar: string}) {
      ipcRenderer.invoke(IpcEvent.OPEN_MAIN_WINDOW, data).catch(console.error);
    }
  };
}();

export default Bridge;

