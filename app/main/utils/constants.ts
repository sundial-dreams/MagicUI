export const IpcEvent = {
  FETCH: 'fetch',
  OPEN: 'open',
  CLOSE: 'close',
  MAXIMIZE: 'maximize',
  MINIMIZE: 'minimize',

  OPEN_MAIN_WINDOW: 'open-main-window'
};


export const WidgetType = {
  MAIN: 'main',
  USER: 'user',
  LOGIN: 'login',
  CODE_VIEWS: 'codeViews',
  WEBGL_VIEWS: 'webglViews',
};

export const WidgetName = {
  CODE_VIEWS: 'code-views',
  WEBGL_VIEWS: 'webgl-views',
  LOGIN: 'login',
  USER: 'user',
  MAIN: 'main'
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