import Bridge from '../public/utils/bridge';

export function fetchAvatars() {
  return Bridge.fetch(
    'GET',
    '/user/get_all_avatar'
  );
}