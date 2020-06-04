import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';
import { createHashHistory } from 'history';

export const history = createHashHistory();

export function close() {
  Bridge.close(WidgetType.AVATAR);
}

export function minimize() {
  Bridge.minimize(WidgetType.LOGIN);
}

export function fetchLoginEmail(email: string) {
  return Bridge.fetch(
    'POST',
    '/user/login/user_email',
    { email }
  ).then(v => v);
}

export function fetchLoginPassword(email: string, password: string) {
  return Bridge.fetch(
    'POST',
    '/user/login/user_password',
    { email, password }
  ).then(v => v);
}

export function registerUser(avatar: string, email: string, nickname: string, password: string) {
  return Bridge.fetch(
    'POST',
    '/user/register/create_user',
    { avatar, email, nickname, password }
  );
}