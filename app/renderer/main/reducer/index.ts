import { initialState, ISettingsStore, IUserState } from '../store';
import { SettingsActions, TActions, UserActions } from '../actions';
import {
  editToolsReducer,
  runToolsReducer,
  componentReducer,
  webGLPageReducer,
  editHistoryReducer, autoSaveLoadingReducer
} from './webglEditor';
import { dslCodeReducer, dslFileArrayReducer, dslFileReducer, openFileItemsReducer } from './dslEditor';

export function userReducer(state: IUserState, action: TActions) {
  switch (action.type) {
    case UserActions.SAVE_USER: {
      return {
        ...state,
        email: action.email,
        password: action.password,
        avatar: action.avatar,
        nickname: action.nickname
      };
    }
    default: {
      return { ...state };
    }
  }
}

export function settingsReducer(state: ISettingsStore, action: TActions) {
  switch (action.type) {
    case SettingsActions.SAVE_SETTINGS: {
      return {
        ...state,
        autoSave: action.autoSave,
        theme: action.theme
      }
    }
    default: {
      return {...state}
    }
  }
}

export default function mainReducer(state = initialState, action: TActions) {
  return {
    editTools: editToolsReducer(state.editTools, action),
    runTools: runToolsReducer(state.runTools, action),
    component: componentReducer(state.component, action),
    webGLPage: webGLPageReducer(state.webGLPage, action),
    editHistory: editHistoryReducer(state.editHistory, action),
    autoSaveLoading: autoSaveLoadingReducer(state.autoSaveLoading, action),

    dslFile: dslFileReducer(state.dslFile, action),
    dslCode: dslCodeReducer(state.dslCode, action),
    dslFileArray: dslFileArrayReducer(state.dslFileArray, action),
    openFileItems: openFileItemsReducer(state.openFileItems, action),

    user: userReducer(state.user, action),
    settings: settingsReducer(state.settings, action)
  };
}
