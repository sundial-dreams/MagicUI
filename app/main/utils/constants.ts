export const IpcEvent = {
  FETCH: 'fetch',
  OPEN: 'open',
  CLOSE: 'close',
  MAXIMIZE: 'maximize',
  MINIMIZE: 'minimize',

  USER_LOGIN: 'user-login',
  UPDATE_USER: 'update-user',
  COMPILE: 'compile',

  SAVE_FILE: 'save-file',
  OPEN_FILE: 'open-file',
  USER_LOGOUT: 'user-logout',

  AUTO_SAVE_WEBGL_PAGE: 'auto-save-webgl-page',

};


export const WidgetType = {
  MAIN: 'main',
  USER: 'user',
  LOGIN: 'login',
  CODE: 'code',
  WEBGL: 'webgl',
  AVATAR: 'avatar'
};

export const WindowSize = {
  WIDTH: 1130,
  HEIGHT: 730
};

export const CustomWindowConfig = {
  webPreferences: {
    nodeIntegration: true
  },
  frame: false,
  backgroundColor: '#333544'
};



