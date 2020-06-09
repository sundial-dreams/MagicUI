import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';

export function fetchAvatars() {
  return Bridge.fetch(
    'GET',
    '/user/get_all_avatar'
  );
}

export function close() {
  Bridge.close(WidgetType.AVATAR);
}