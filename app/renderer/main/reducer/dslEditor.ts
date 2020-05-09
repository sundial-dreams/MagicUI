import { IDSLCodeState, IDSLFileArrayState, IDSLFileState, IOpenFileItemsState } from '../store/dslEditor';
import { TActions } from '../actions';
import { DSLCodeActions, DSLFileActions, DSLFileArrayActions, OpenFileItemsActions } from '../actions/dslEditor';

export function dslFileReducer(state: IDSLFileState, action: TActions) {
  switch (action.type) {
    case DSLFileActions.SELECT_FILE: {
      return {
        ...state,
        id: action.id,
        fileType: action.fileType,
        filename: action.filename,
        folder: action.folder,
        code: action.code
      };
    }
    default: {
      return { ...state };
    }
  }
}


export function dslCodeReducer(state: IDSLCodeState, action: TActions) {
  switch (action.type) {
    case DSLCodeActions.SELECTED_FILE_CODE: {
      return {
        ...state,
        name: action.name,
        code: action.code,
        id: action.id
      }
    }
    default: {
      return {...state}
    }
  }
}


export function dslFileArrayReducer(state: IDSLFileArrayState, action: TActions) {
  switch (action.type) {
    case DSLFileArrayActions.APPEND_FILE: {
      return {
        files: state.files.concat({
          id: action.id,
          filename: action.filename,
          fileType: action.fileType,
          folder: action.folder,
          code: action.code
        })
      }
    }
    case DSLFileArrayActions.FETCH_FILES: {
      return {
        files: action.files
      }
    }
    case DSLFileArrayActions.LOCAL_SAVE_FILE: {
      for (let i = 0; i < state.files.length; i ++) {
        if (state.files[i].id === action.id) {
          state.files[i].code = action.code;
        }
      }
      return {
        files: [...state.files]
      }
    }
    default: {
      return {...state}
    }
  }
}

export function openFileItemsReducer(state: IOpenFileItemsState, action: TActions) {
  switch (action.type) {
    case OpenFileItemsActions.ADD_FILE: {
      const has = state.items.some(v => v.id === action.item.id);
      let index;
      if (has) {
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].id === action.item.id) {
            index = i;
            break;
          }
        }
      }
      return {
        ...state,
        items: has ? [...state.items] : state.items.concat(action.item),
        currentIndex: has ? index : state.items.length
      }
    }
    case OpenFileItemsActions.CLOSE_FILE: {
      console.log(action.index);
      return {
        ...state,
        currentIndex: 0,
        items: state.items.filter((v, i) => i !== action.index)
      }
    }
    case OpenFileItemsActions.CHANGE_INDEX: {
     return {
       ...state,
       currentIndex: action.currentIndex
     }
    }
    case OpenFileItemsActions.LOCAL_SAVE_FILE: {
      console.log('items', state.items, 'index', action.index);
      state.items[action.index].code = action.code;
      return {
        ...state,
        items: [...state.items]
      }
    }
    default: {
      return {...state}
    }
  }
}