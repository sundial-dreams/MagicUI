import createCodeViewsWidget from './codeViews';
import createWebGLViewsWidget from './webglViews';
import { WidgetName } from '../utils/constants';
import createUserWindow from './user';

export const WidgetMap = {
  [WidgetName.CODE_VIEWS]: createCodeViewsWidget,
  [WidgetName.WEBGL_VIEWS]: createWebGLViewsWidget,
  [WidgetName.USER]: createUserWindow
};

export default function createWidgetByName(parent: Electron.BrowserWindow, name: string, data: any) {
  return WidgetMap[name](parent, data);
}