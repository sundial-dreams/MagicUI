import Electron, { ipcRenderer } from 'electron';
import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';


export function close() {
  Bridge.close(WidgetType.WEBGL);
}

