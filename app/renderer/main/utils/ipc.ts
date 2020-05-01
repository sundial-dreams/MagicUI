import { ipcRenderer } from 'electron';

export function onCreateWindow(callback: (data: any) => void) {
  ipcRenderer.on('user-data', (event, args) => {
    callback(args);
  });
}