import {IComponentStore, IEditToolsStore, initialState} from '../store';
import { TActions, EditToolsActions, CurrentComponentActions} from '../actions';

export function editToolsReducer(state: IEditToolsStore, action: TActions) {
  switch (action.type) {
    case EditToolsActions.DELETE: {
      return {
        ...state,
        id: action.id,
        editType: 'delete'
      };
    }
    case EditToolsActions.COPY: {
      return {
        ...state,
        id: action.id,
        editType: 'copy'
      }
    }

    case EditToolsActions.CUT: {
      return {
        ...state,
        id: action.id,
        editType: 'cut'
      }
    }

    case EditToolsActions.PASTE: {
      return {
        ...state,
        id: action.id,
        editType: 'paste'
      }
    }

    case EditToolsActions.RESET: {
      return {
        ...state,
        id: '',
        editType: ''
      }
    }

    default: {
      return {...state};
    }
  }
}

export function currentComponentReducer(state: IComponentStore, action: TActions) {
  switch (action.type) {
    case CurrentComponentActions.SELECT: {
      return {
        ...state,
        id: action.id,
        name: action.name,
        props: action.props
      };
    }
    case CurrentComponentActions.DRAG_COMPONENT: {
      return {
        ...state,
        props: {
          ...state.props,
          position: action.position
        }
      }
    }
    case CurrentComponentActions.TRANSFORM_COMPONENT: {
      return {
        ...state,
        props: {
          ...state.props,
          size: action.size
        }
      }
    }
    case CurrentComponentActions.CHANGE_BACKGROUND: {
      return {
        ...state,
        props: {
          ...state.props,
          background: {
            fill: action.fill,
            opacity: action.opacity
          }
        }
      }
    }
    case CurrentComponentActions.CHANGE_TEXT: {
      return {
        ...state,
        props: {
          ...state.props,
          text: {
            fill: action.fill,
            text: action.text
          }
        }
      }
    }
    case CurrentComponentActions.CHANGE_SHADOW: {
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
      }
    }
    case CurrentComponentActions.CHANGE_BORDER: {
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
      }
    }
    default: {
      return {...state};
    }
  }
}

export default function reducer(state = initialState, action: TActions) {
  return {
    editTools: editToolsReducer(state.editTools, action),
    currentComponent: currentComponentReducer(state.currentComponent, action)
  };
}
