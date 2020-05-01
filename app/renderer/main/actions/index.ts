import { Action, AnyAction } from 'redux';

export type TActions = Action & AnyAction;

export enum UserActions {
  SAVE_USER = 'save user',
  CHANGE_USER = 'change user'
}

export function saveUser(args: { email: string, avatar: string, password: string }) {
  return {
    type: UserActions.SAVE_USER,
    ...args
  };
}


