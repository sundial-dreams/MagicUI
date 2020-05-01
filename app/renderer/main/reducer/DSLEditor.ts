import { IDSLFileState } from '../store/DSLEditor';
import { TActions } from '../actions';
import { DSLFileActions } from '../actions/DSLEditor';

export function dslFileReducer(state: IDSLFileState, action: TActions) {
  switch (action.type) {
    case DSLFileActions.SELECT_FILE: {
      return {
        ...state,
        id: action.id,
        fileType: action.fileType,
        filename: action.filename
      }
    }
    default: {
      return {...state}
    }
  }
}

