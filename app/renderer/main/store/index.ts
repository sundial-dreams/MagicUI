import { createStore } from 'redux';
import reducer from '../reducer';
import { IDSLFileState, createDSLFileState } from './DSLEditor';
import {
  IRunToolsState,
  IComponentState,
  IEditToolsState,
  createRunToolsState,
  createComponentState,
  createEditToolsState
} from './UIEditor';

export interface IUserState {
  email: string;
  password?: string;
  avatar?: string;
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
  dslFile: IDSLFileState,
  user: IUserState
}

function createInitialStore(): IStoreState {
  return {
    // ui editor page
    editTools: createEditToolsState(),
    runTools: createRunToolsState(),
    component: createComponentState(),
    // dsl editor page
    dslFile: createDSLFileState(),

    // user state
    user: createUserState()
  };
}


export const initialState = createInitialStore();

const store = createStore(reducer);

export default store;



