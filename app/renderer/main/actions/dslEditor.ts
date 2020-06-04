export enum DSLFileActions {
  SELECT_FILE = 'select-file',
  DELETE_FILE = 'delete-file'
}

export const selectFile = (id: string, fileType: string, filename: string, folder: string, code: string, fileId: string) => ({
  type: DSLFileActions.SELECT_FILE,
  id,
  fileType,
  filename,
  folder,
  code,
  fileId
});

export enum DSLCodeActions {
  SELECTED_FILE_CODE = 'selected-file-code'
}

export const selectedFileCode = (name: string, code: string, id: string, fileId: string) => ({
  type: DSLCodeActions.SELECTED_FILE_CODE,
  name,
  code,
  id,
  fileId
});


export enum DSLFileArrayActions {
  APPEND_FILE = 'append-file',
  REMOVE_FILE = 'remove-file',
  FETCH_FILES = 'fetch-files',
  LOCAL_SAVE_FILE = 'local-save-file'
}

export const appendFile = (id:string, filename: string, fileType: string, folder: string, code: string, fileId: string) => ({
  type: DSLFileArrayActions.APPEND_FILE,
  id,
  filename,
  fileType,
  folder,
  code,
  fileId
});

export const fetchFiles = (files: any[]) => ({
  type: DSLFileArrayActions.FETCH_FILES,
  files
});

export const localSaveFile = (id: string, code: string) => ({
  type: DSLFileArrayActions.LOCAL_SAVE_FILE,
  id,
  code
});

export const localDeleteFile = (id: string) => ({
  type: DSLFileArrayActions.REMOVE_FILE,
  id
})

export enum OpenFileItemsActions {
  ADD_FILE = 'add-file',
  CLOSE_FILE = 'close-file',
  CHANGE_INDEX = 'change-index',
  LOCAL_SAVE_FILE = 'open-file-local-save-file'
}

export const addFile = (id: string, name: string, code: string, fileId: string) => ({
  type: OpenFileItemsActions.ADD_FILE,
  item: { id, name, code, fileId }
});

export const closeFile = (index: number, id: string, fileId: string) => ({
  type: OpenFileItemsActions.CLOSE_FILE,
  index,
  id,
  fileId
});

export const changeIndex = (index: number) => ({
  type: OpenFileItemsActions.CHANGE_INDEX,
  currentIndex: index
});

export const openFileLocalSave = (index: number, id: string, code: string, fileId: string) => ({
  type: OpenFileItemsActions.LOCAL_SAVE_FILE,
  index,
  id,
  code,
  fileId
});