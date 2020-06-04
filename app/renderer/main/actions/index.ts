import { Action, AnyAction } from 'redux';

export type TActions = Action & AnyAction;

export enum UserActions {
  SAVE_USER = 'save user',
  CHANGE_USER = 'change user'
}

export function saveUser(args: { email: string, avatar: string, password: string, nickname: string }) {
  return {
    type: UserActions.SAVE_USER,
    ...args
  };
}

export enum SettingsActions {
  SAVE_SETTINGS = 'save settings',
  CHANGE_SETTINGS = 'change settings'
}

export function saveSettings(settings: {theme: string, autoSave: boolean}) {
  return {
    type: SettingsActions.SAVE_SETTINGS,
    ...settings
  }
}



