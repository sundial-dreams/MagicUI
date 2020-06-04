import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';

export function close() {
  Bridge.close(WidgetType.USER);
}

export function minimize() {
  Bridge.minimize(WidgetType.USER);
}

export function logout() {
  Bridge.logout().catch();
}

export function modifyUser(email: string, name: string, password: string, avatar: string) {
  return Bridge.fetch(
    'POST',
    '/user/modify/modify_user',
    { email, nickname: name, password, avatar }
  )
}