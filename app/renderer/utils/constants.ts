import {createHashHistory} from 'history';

export const IpcEvent = {
  CLOSE_WINDOW: 'close-window',
  MINIMIZE_WINDOW: 'minimize-window',
  MAXIMIZE_WINDOW: 'maximize-window'
};

export const Routers = {
  MAIN: '/',
  UI_EDITOR: '/ui_editor',
  CODE_EDITOR: '/code_editor'
};

export const history = createHashHistory();
