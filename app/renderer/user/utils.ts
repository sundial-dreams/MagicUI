import Bridge from '../public/utils/bridge';
import { WidgetName } from '../public/utils/constants';

export function close() {
  Bridge.close(WidgetName.USER);
}

export function minimize() {
  Bridge.minimize(WidgetName.USER);
}

export function logout() {
  Bridge.logout().catch();
}