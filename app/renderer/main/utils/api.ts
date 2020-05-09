import Bridge from '../../public/utils/bridge';

export function createOnePage(email: string, name: string, description: string) {
  return Bridge.fetch(
    'POST',
    'ui_editor/create_page',
    { email, name, description }
  );
}

export function fetchPages(email: string) {
  return Bridge.fetch(
    'GET',
    'ui_editor/all_page',
    {email}
  ).then(v => ({...v, pages: v.pages.map((v1: any) => ({...v1, pageId: v1._id}))}))
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

export function saveDslCode(id: string, email: string, fileType: string, code: string) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/save_dsl_code',
    { id, email, fileType, code }
  )
}

export function saveAllDslCode(email: string, files: {id: string, code: string}[]) {
  return Bridge.fetch(
    'POST',
    'dsl_editor/save_all_dsl_code',
    { email, files: JSON.stringify(files) }
  );
}