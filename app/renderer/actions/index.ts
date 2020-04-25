import {Action, AnyAction} from 'redux';
import components from '../webgl/components/components';

export type TActions = Action & AnyAction;

export enum EditToolsActions {
  DELETE = 'delete',
  SAVE = 'save',
  CUT = 'cut',
  COPY = 'copy',
  UNDO = 'undo',
  PASTE = 'paste',
  RESET = ''
}

export const resetComponent = () => {
  return {
    type: EditToolsActions,
    componentId: '',
    editType: ''
  }
};

export const deleteComponent = (componentId: string) => {
  return {
    type: EditToolsActions.DELETE,
    id: componentId,
    editType: 'delete'
  };
};

export const copyComponent = (componentId: string) => {
  return {
    type: EditToolsActions.COPY,
    id: componentId,
    editType: 'copy'
  }
};

export const pasteComponent = (componentId: string) => {
  return {
    type: EditToolsActions.PASTE,
    id: componentId,
    editType: 'paste'
  }
};

export const cutComponent = (componentId: string) => {
  return {
    type: EditToolsActions.CUT,
    id: componentId,
    editType: 'cut'
  }
};

export const undoComponent = () => {

};

export enum CurrentComponentActions {
  SELECT = 'select',
  DRAG_COMPONENT = 'drag component',
  TRANSFORM_COMPONENT = 'transform component',
  CHANGE_BACKGROUND = 'change background',
  CHANGE_SHADOW = 'change shadow',
  CHANGE_TEXT = 'change text',
  CHANGE_BORDER = 'change border'
}

export const selectComponent = (id: string, name: string, props: any) => {
  return {
    type: CurrentComponentActions.SELECT,
    id,
    name,
    props
  }
};

export const dragComponent = (position: {x: number, y: number}) => {

  return {
    type: CurrentComponentActions.DRAG_COMPONENT,
    position
  }
};

export const transformComponent = (size: {width: number, height: number}) => {

  return {
    type: CurrentComponentActions.TRANSFORM_COMPONENT,
    size
  }
};


export const changeBackground = (fill: string, opacity: number) => {
  return {
    type: CurrentComponentActions.CHANGE_BACKGROUND,
    fill,
    opacity
  }
};

export const changeShadow = (fill: string, blur: number, offsetX: number, offsetY: number) => {
  return {
    type: CurrentComponentActions.CHANGE_SHADOW,
    fill,
    blur,
    offsetX,
    offsetY
  }
};

export const changeText = (fill: string, text: string) => {
  return {
    type: CurrentComponentActions.CHANGE_TEXT,
    fill,
    text
  }
};

export const changeBorder = (fill: string, width: number, radius: number) => {
  return {
    type: CurrentComponentActions.CHANGE_BORDER,
    fill,
    width,
    radius
  }
};