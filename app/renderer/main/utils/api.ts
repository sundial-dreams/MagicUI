import Bridge from '../../public/utils/bridge';

export function createNewPage(email: string, name: string, description: string) {
  return Bridge.fetch(
    'POST',
    'ui_editor/create_page',
    { email, name, description }
  );
}

export function fetchAllPages(email: string) {
  return Bridge.fetch(
    'GET',
    'ui_editor/all_page',
    {email}
  );
}

export function fetchOnePage(email: string, pageId: string) {
  return Bridge.fetch(
    'GET',
    'ui_editor/get_page',
    { email, pageId }
  )
}

export function deleteOnePage(email: string, id: string) {
  return Bridge.fetch(
    'POST',
    'ui_editor/delete_page',
    { email, id }
  )
}

export function modifyPageName(email: string, id: string, name: string) {
  return Bridge.fetch(
    'POST',
    'ui_editor/rename_page',
    { email, id, name }
  )
}

export function savePage(pageId: string, updatedPage: object) {
  return Bridge.fetch(
    'POST',
    'ui_editor/update_page',
    {pageId, updatedPage: JSON.stringify(updatedPage)}
  );
}

export function fetchDslFiles(email: string) {
  return Bridge.fetch(
    'GET',
    'dsl_editor/dsl_files',
    { email }
  )
}

export function createDslFile(email: string, filename: string, fileType: string, folder: string) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/create_dsl_file',
    { email, filename, fileType, folder }
  )
}

export function saveDslCode(id: string, email: string, code: string, fileId: string) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/save_dsl_code',
    { id, email, code, fileId }
  )
}

export function saveAllDslCode(email: string, files: {id: string, fileId?: string, code: string}[]) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/save_all_dsl_code',
    { email, files: JSON.stringify(files) }
  );
}

export function fetchDslCode(email: string, fileId: string) {
  return Bridge.fetch(
    'GET',
    'dsl_editor/dsl_code',
    { email, fileId }
  )
}

export function deleteDslFile(email: string, id: string, fileId: string) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/remove_dsl_file',
    { email, id, fileId, fileType: 'file' }
  )
}

export function fetchSystemSettings(email: string) {
  return Bridge.fetch(
    'GET',
    'user/user_settings',
    { email }
  )
}