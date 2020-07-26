import { constants } from 'os';
import { EventEmitter } from '../../public/utils';

export enum EditToolsActions {
  DELETE = 'edit-tools-delete',
  SAVE = 'edit-tools-save',
  CUT = 'edit-tools-cut',
  COPY = 'edit-tools-copy',
  UNDO = 'edit-tools-undo',
  PASTE = 'edit-tools-paste',
  RESET = 'edit-tools-reset'
}

export const saveComponent = () => ({
  type: EditToolsActions.SAVE,
  id: 'none',
  editType: 'save'
});

export const resetComponent = () => ({
  type: EditToolsActions.RESET,
  id: '',
  editType: ''
});

export const deleteComponent = (id: string) => {
  return ({
    type: EditToolsActions.DELETE,
    id,
    editType: 'delete'
  });
};

export const copyComponent = (id: string) => ({
  type: EditToolsActions.COPY,
  id,
  editType: 'copy'
});

export const pasteComponent = (id: string) => ({
  type: EditToolsActions.PASTE,
  id,
  editType: 'paste'
});

export const cutComponent = (id: string) => ({
  type: EditToolsActions.CUT,
  id,
  editType: 'cut'
});

export const undoComponent = (id: string) => ({
  type: EditToolsActions.UNDO,
  id,
  editType: 'undo'
});

export enum ComponentActions {
  SELECT_COMPONENT = 'select-component',
  DRAG_COMPONENT = 'drag-component',
  TRANSFORM_COMPONENT = 'transform-component',
  CHANGE_COMPONENT_BACKGROUND = 'change-component-background',
  CHANGE_COMPONENT_SHADOW = 'change-component-shadow',
  CHANGE_COMPONENT_TEXT = 'change-component-text',
  CHANGE_COMPONENT_BORDER = 'change-component-border',
  CHANGE_COMPONENT_IMAGE = 'change-component-image'
}

export const selectComponent = (id: string, type: string, name: string, path: string, props: any) => ({
  type: ComponentActions.SELECT_COMPONENT,
  id,
  name,
  path,
  props
});

export const dragComponent = (position: { x: number, y: number }) => ({
  type: ComponentActions.DRAG_COMPONENT,
  position
});

export const transformComponent = (size: { width: number, height: number }) => ({
  type: ComponentActions.TRANSFORM_COMPONENT,
  size
});

export const changeComponentBackground = (fill: string, opacity: number) => ({
  type: ComponentActions.CHANGE_COMPONENT_BACKGROUND,
  fill,
  opacity
});

export const changeComponentShadow = (fill: string, blur: number, offsetX: number, offsetY: number) => ({
  type: ComponentActions.CHANGE_COMPONENT_SHADOW,
  fill,
  blur,
  offsetX,
  offsetY
});

export const changeComponentText = (fill: string, text: string, fontSize: number) => ({
  type: ComponentActions.CHANGE_COMPONENT_TEXT,
  fill,
  text,
  fontSize,
});

export const changeComponentBorder = (fill: string, width: number, radius: number) => ({
  type: ComponentActions.CHANGE_COMPONENT_BORDER,
  fill,
  width,
  radius
});

export const changeComponentImage = (src: string) => ({
  type: ComponentActions.CHANGE_COMPONENT_IMAGE,
  src
});

export enum RunToolsActions {
  BUILD = 'run-tools-build',
  RUN = 'run-tools-run',
  EXPORT = 'run-tools-export',
  RESET = 'run-tools-reset'
}

export const buildCode = () => ({
  type: RunToolsActions.BUILD
});

export const runCode = () => ({
  type: RunToolsActions.RUN
});

export const exportCode = () => ({
  type: RunToolsActions.EXPORT
});

export const resetCode = () => ({
  type: RunToolsActions.RESET
});


export enum WebGLPageActions {
  SELECT = 'select-current-webgl-page',
}

export const selectWebGLPage = (pageId: string, name: string, page: object | null, id: string) => ({
  type: WebGLPageActions.SELECT,
  pageId,
  page,
  name,
  id
});


export enum EditHistoryActions {
  ADD_EDIT_HISTORY = 'add-edit-history',
  REMOVE_EDIT_HISTORY = 'remove-edit-history',
  RESET_EDIT_HISTORY = 'reset-edit-history'
}

export const addEditHistory = (id: string, operator: string, data: {old: any, new: any}) => ({
  type: EditHistoryActions.ADD_EDIT_HISTORY,
  id,
  operator,
  data
});

export const removeEditHistory = () => ({
  type: EditHistoryActions.REMOVE_EDIT_HISTORY
});

export const resetEditHistory = () => ({
  type: EditHistoryActions.RESET_EDIT_HISTORY
});

export enum AutoSaveLoadingActions {
  SET_LOADING = 'set-loading',
}

export const setAutoSaveLoading = (v: boolean) => ({
  type: AutoSaveLoadingActions.SET_LOADING,
  loading: v
})