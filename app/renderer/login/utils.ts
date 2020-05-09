import Bridge from '../public/utils/bridge';
import { WidgetName } from '../public/utils/constants';

export function close() {
  Bridge.close(WidgetName.LOGIN);
}

export function minimize() {
  Bridge.minimize(WidgetName.LOGIN);
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