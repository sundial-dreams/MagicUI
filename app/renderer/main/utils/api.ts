import Bridge from '../../public/utils/bridge';

export function createOnePage(email: string, name: string, description: string) {
  return Bridge.fetch(
    'POST',
    'ui_editor/create_page',
    { email, name, description }
  );
}
