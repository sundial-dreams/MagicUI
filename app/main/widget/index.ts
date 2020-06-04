import CodeWidget from './code';
import WebGLWidget from './webgl';
import { WidgetType } from '../utils/constants';
import LoginWidget from './login';
import UserWidget from './user';
import MainWidget from './main';
import AvatarWidget from './avatar';

export const Login = LoginWidget.getInstance();

export const Main = MainWidget.getInstance();

export const User = UserWidget.getInstance();

export const Code = CodeWidget.getInstance();

export const WebGL = WebGLWidget.getInstance();

export const Avatar = AvatarWidget.getInstance();


export const WidgetMap = {
  [WidgetType.CODE](parent: Electron.BrowserWindow, data: any) {
    return Code.create(parent, data);
  },
  [WidgetType.WEBGL](parent: Electron.BrowserWindow, data: any) {
    return WebGL.create(parent, data);
  },
  [WidgetType.USER](parent: Electron.BrowserWindow, data: any) {
    return User.create(parent, data);
  },
  [WidgetType.AVATAR](parent: Electron.BrowserWindow, data: any) {
    return Avatar.create(parent, data);
  }
};

export default function createSubWidgetByName(parent: Electron.BrowserWindow, name: string, data: any) {
  return WidgetMap[name](parent, data);
}

