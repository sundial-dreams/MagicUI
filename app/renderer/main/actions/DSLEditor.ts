export enum DSLFileActions {
  SELECT_FILE = 'select-file',
  DELETE_FILE = 'delete-file'
}

export const selectFile = (id: number, fileType: string, filename: string) => ({
  type: DSLFileActions.SELECT_FILE,
  id,
  fileType,
  filename
});