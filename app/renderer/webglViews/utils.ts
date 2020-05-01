import Electron, { ipcRenderer } from 'electron';
import Bridge from '../public/utils/bridge';
import { WidgetName } from '../public/utils/constants';


export function close() {
  Bridge.close(WidgetName.WEBGL_VIEWS);
}

