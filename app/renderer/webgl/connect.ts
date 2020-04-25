import Konva from 'konva';
import {Dispatch} from 'redux';
import {EActions} from '../actions';
// dispatch + webgl
export default class Connect {

}

export function dispatchComponentInfo(dispatch: Dispatch, currentComponent: any) {
  return dispatch({ type: EActions.CURRENT_COMPOENT, currentComponent });
}

