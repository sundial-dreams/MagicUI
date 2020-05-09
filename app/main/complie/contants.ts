
export const COMPONENT_TYPES = {
  LAYER: {

  },
  BUTTON: {
    CUSTOM_BUTTON: 'custom_button',
  },
  INPUT: {
    CUSTOM_INPUT: 'custom_input'
  },
  SHAPE: {
    RECT: 'rect',
    CIRCLE: 'circle',
    ELLIPSE: 'ellipse'
  },
  WIDGET: {
    PC_WIDGET: 'pc_widget',
    MOBILE_WIDGET: 'mobile_widget'
  },
  TEXT: {
    LABEL: 'label',
    CUSTOM_TEXT: 'text'
  },
  IMAGE: {
    CUSTOM_IMAGE: 'custom_image'
  }
};


export const TYPES = Object.keys(COMPONENT_TYPES).reduce((acc, cur) => {
  (acc as any)[cur] = cur;
  return acc;
}, {}) as any;