import Electron, { ipcRenderer } from 'electron';
import { IpcEvent } from './constants';

const Call = function () {

  return {
    minimizeMainWindow() {

    },

    maximizeMainWindow() {

    },

    closeMainWindow() {

    }
  }
}();

export const WindowManager = {
  close() {
    ipcRenderer.invoke(IpcEvent.CLOSE_WINDOW).catch(console.error);
  },
  minimize() {
    ipcRenderer.invoke(IpcEvent.MINIMIZE_WINDOW).catch(console.error);
  },
  maximize() {
    ipcRenderer.invoke(IpcEvent.MAXIMIZE_WINDOW).catch(console.error);
  }
};

export default Call;
