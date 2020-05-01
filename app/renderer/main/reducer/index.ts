import { initialState, IUserState } from '../store';
import { TActions, UserActions } from '../actions';
import { editToolsReducer, runToolsReducer, componentReducer } from './UIEditor';
import { dslFileReducer } from './DSLEditor';

export function userReducer(state: IUserState, action: TActions) {
  switch (action.type) {
    case UserActions.SAVE_USER: {
      return {
        ...state,
        email: action.email
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
    dslFile: dslFileReducer(state.dslFile, action),
    user: userReducer(state.user, action)
  };
}
