import {
  IAutoSaveLoadingState,
  IComponentState,
  IEditHistoryState,
  IEditToolsState,
  IRunToolsState,
  IWebGLPageState
} from '../store/webglEditor';
import { TActions } from '../actions';
import {
  AutoSaveLoadingActions,
  ComponentActions,
  EditHistoryActions,
  EditToolsActions,
  RunToolsActions,
  WebGLPageActions
} from '../actions/webglEditor';
import EditTools from '../pages/WebGLEditor/EditTools';

export function editToolsReducer(state: IEditToolsState, action: TActions) {
  switch (action.type) {
    case EditToolsActions.DELETE: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      };
    }
    case EditToolsActions.COPY: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      };
    }
    case EditToolsActions.CUT: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      };
    }
    case EditToolsActions.PASTE: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      };
    }
    case EditToolsActions.RESET: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      };
    }
    case EditToolsActions.SAVE: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      }
    }
    case EditToolsActions.UNDO: {
      return {
        ...state,
        id: action.id,
        editType: action.editType
      }
    }
    default: {
      return { ...state };
    }
  }
}

export function componentReducer(state: IComponentState, action: TActions) {
  switch (action.type) {
    case ComponentActions.SELECT_COMPONENT: {
      return {
        ...state,
        id: action.id,
        name: action.name,
        cpnType: action.cpnType,
        props: action.props,
        path: action.path,
        operator: 'select-component'
      };
    }
    case ComponentActions.DRAG_COMPONENT: {
      return {
        ...state,
        operator: 'drag-component',
        props: {
          ...state.props,
          position: action.position
        }
      };
    }
    case ComponentActions.TRANSFORM_COMPONENT: {
      return {
        ...state,
        operator: 'transform-component',
        props: {
          ...state.props,
          size: action.size
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_BACKGROUND: {
      return {
        ...state,
        operator: 'change-component-background',
        props: {
          ...state.props,
          background: {
            fill: action.fill,
            opacity: action.opacity
          }
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_TEXT: {
      return {
        ...state,
        operator: 'change-component-text',
        props: {
          ...state.props,
          text: {
            fill: action.fill,
            text: action.text
          }
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_BORDER: {
      return {
        ...state,
        operator: 'change-component-border',
        props: {
          ...state.props,
          border: {
            fill: action.fill,
            width: action.width,
            radius: action.radius
          }
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_SHADOW: {
      return {
        ...state,
        operator: 'change-component-shadow',
        props: {
          ...state.props,
          shadow: {
            fill: action.fill,
            blur: action.blur,
            offsetX: action.offsetX,
            offsetY: action.offsetY
          }
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_IMAGE: {
      return {
        ...state,
        operator: 'change-component-image',
        props: {
          ...state.props,
          image: {
            src: action.src
          }
        }
      }
    }
    default: {
      return { ...state };
    }
  }
}

export function runToolsReducer(state: IRunToolsState, action: TActions) {
  switch (action.type) {
    case RunToolsActions.BUILD: {
      return {
        ...state,
        runType: 'build'
      };
    }
    case RunToolsActions.RUN: {
      return {
        ...state,
        runType: 'run'
      };
    }
    case RunToolsActions.EXPORT: {
      return {
        ...state,
        runType: 'export'
      };
    }
    case RunToolsActions.RESET: {
      return {
        ...state,
        runType: ''
      };
    }
    default: {
      return { ...state };
    }
  }
}

export function webGLPageReducer(state: IWebGLPageState, action: TActions) {
  switch (action.type) {
    case WebGLPageActions.SELECT: {
      return {
        ...state,
        pageId: action.pageId,
        page: action.page,
        name: action.name,
        id: action.id
      }
    }
    default: {
      return { ...state };
    }
  }
}


export function editHistoryReducer(state: IEditHistoryState, action: TActions) {
  switch (action.type) {
    case EditHistoryActions.ADD_EDIT_HISTORY: {
      return {
        history: [...state.history, { id: action.id, operator: action.operator, data: action.data }]
      }
    }
    case EditHistoryActions.REMOVE_EDIT_HISTORY: {
      const current = state.history.pop();
      return {
        history: [...state.history],
        current
      }
    }
    case EditHistoryActions.RESET_EDIT_HISTORY: {
      return {
        history: [],
        current: undefined
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}


export function autoSaveLoadingReducer(state: IAutoSaveLoadingState, action: TActions) {
  switch (action.type) {
    case AutoSaveLoadingActions.SET_LOADING: {
      return {
        ...state,
        loading: action.loading
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

