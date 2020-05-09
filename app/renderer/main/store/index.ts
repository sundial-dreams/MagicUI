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
  createEditToolsState, createCurrentWebGLPageState, IWebGLPageState, createEditHistoryState, IEditHistoryState
} from './webglEditor';

export interface IUserState {
  email: string;
  password?: string;
  avatar?: string;
  nickname?:string
}

function createUserState(): IUserState {
  return  {
    email: ''
  }
}


export interface IStoreState {
  editTools: IEditToolsState,
  runTools: IRunToolsState,
  component: IComponentState,
  webGLPage: IWebGLPageState,
  editHistory: IEditHistoryState,

  dslFile: IDSLFileState,
  dslCode: IDSLCodeState,
  openFileItems: IOpenFileItemsState,
  dslFileArray: IDSLFileArrayState,

  user: IUserState
}

function createInitialStore(): IStoreState {
  return {
    // ui editor page
    editTools: createEditToolsState(),
    runTools: createRunToolsState(),
    component: createComponentState(),
    webGLPage: createCurrentWebGLPageState(),
    editHistory: createEditHistoryState(),

    // dsl editor page
    dslFile: createDSLFileState(),
    dslCode: createDSLCodeState(),
    dslFileArray: createDSLFileArrayState(),
    openFileItems: createOpenFileItemsState(),

    // user state
    user: createUserState()
  };
}


export const initialState = createInitialStore();

const store = createStore(reducer);

export default store;



