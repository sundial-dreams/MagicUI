import { IComponentState, IEditToolsState, IRunToolsState } from '../store/UIEditor';
import { TActions } from '../actions';
import { ComponentActions, EditToolsActions, RunToolsActions } from '../actions/UIEditor';
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
        props: action.props
      }
    }
    case ComponentActions.DRAG_COMPONENT: {
      return {
        ...state,
        props: {
          ...state.props,
          position: action.position
        }
      }
    }
    case ComponentActions.TRANSFORM_COMPONENT: {
      return {
        ...state,
        props: {
          ...state.props,
          size: action.size
        }
      };
    }
    case ComponentActions.CHANGE_COMPONENT_BACKGROUND: {
      return {
        ...state,
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
    default: {
      return {...state}
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