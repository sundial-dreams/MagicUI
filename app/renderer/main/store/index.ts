import { createStore } from 'redux';
import reducer from '../reducer';
import {
  IDSLFileState,
  createDSLFileState,
  createDSLCodeState,
  IDSLCodeState,
  createDSLFileArrayState, IDSLFileArrayState, IOpenFileItemsState, createOpenFileItemsState
} from './dslEditor';
import {
  IRunToolsState,
  IComponentState,
  IEditToolsState,
  createRunToolsState,
  createComponentState,
  createEditToolsState,
  createCurrentWebGLPageState,
  IWebGLPageState,
  createEditHistoryState,
  IEditHistoryState,
  createWebGLPageListSate, IAutoSaveLoadingState, createAutoSaveLoadingState
} from './webglEditor';

export interface IUserState {
  email: string;
  password: string;
  avatar: string;
  nickname:string
}

function createUserState(): IUserState {
  return  {
    email: '',
    password: '',
    avatar: '',
    nickname: ''
  }
}

export interface ISettingsStore {
  theme: string;
  autoSave: boolean;
}

function createSettingsStore(): ISettingsStore {
  return {
    theme: '',
    autoSave: true
  }
}

export interface IStoreState {
  editTools: IEditToolsState,
  runTools: IRunToolsState,
  component: IComponentState,
  webGLPage: IWebGLPageState,
  editHistory: IEditHistoryState,
  autoSaveLoading: IAutoSaveLoadingState,

  dslFile: IDSLFileState,
  dslCode: IDSLCodeState,
  openFileItems: IOpenFileItemsState,
  dslFileArray: IDSLFileArrayState,

  user: IUserState,
  settings: ISettingsStore
}

function createInitialStore(): IStoreState {
  return {
    // ui editor page
    editTools: createEditToolsState(),
    runTools: createRunToolsState(),
    component: createComponentState(),
    webGLPage: createCurrentWebGLPageState(),
    editHistory: createEditHistoryState(),
    autoSaveLoading: createAutoSaveLoadingState(),

    // dsl editor page
    dslFile: createDSLFileState(),
    dslCode: createDSLCodeState(),
    dslFileArray: createDSLFileArrayState(),
    openFileItems: createOpenFileItemsState(),

    // user state
    user: createUserState(),
    settings: createSettingsStore()
  };
}


export const initialState = createInitialStore();

const store = createStore(reducer);

export default store;



