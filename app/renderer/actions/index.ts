import { Action, AnyAction } from 'redux';
export enum EActions {
  INC = '0',
  DES = '1'
}

export type TActions = Action & AnyAction;