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

export const COMPONENT_TYPES = {
  LAYER: {

  },
  BUTTON: {
    CUSTOM_BUTTON: 'custom button',
  },
  INPUT: {
    CUSTOM_INPUT: 'custom input'
  },
  SHAPE: {
    RECT: 'rect',
    CIRCLE: 'circle',
    ELLIPSE: 'ellipse'
  },
  WIDGET: {
    PC_WIDGET: 'pc widget',
    MOBILE_WIDGET: 'mobile widget'
  },
  TEXT: {
    LABEL: 'label',
    CUSTOM_TEXT: 'text'
  },
  IMAGE: {
    CUSTOM_IMAGE: 'custom image'
  }
};


export const WEBGL_COMPONENT_PROP_TYPES = {
  BASIC: 'basic',
  SHADOW: 'shadow',
  BACKGROUND: 'background',
  BORDER: 'border',
  TEXT: 'text',
  IMAGE: 'image'
};