import { initialState, IStoreState } from '../store';
import { EActions, TActions } from '../actions';
export function reducer(state = initialState, action: TActions): IStoreState {
  switch (action.type) {
    case EActions.INC: {
      return { ...state, count: action.count }
    }
    case EActions.DES: {
      return { ...state, count: action.count }
    }
    default: {
      return state
    }
  }
}
