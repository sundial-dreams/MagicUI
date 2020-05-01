import Electron from 'electron';
import path from "path";
export function loadHtmlByName(window: Electron.BrowserWindow, name: string) {
  if (process.env.NODE_ENV === 'development') {
    window.loadURL(`http://localhost:8080/dist/${name}.html`).catch(console.error);
    return;
  }
  window.loadFile(path.resolve(__dirname, `../renderer/${name}/index.html`)).catch(console.error);
}
