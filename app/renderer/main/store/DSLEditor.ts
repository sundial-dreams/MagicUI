export interface IDSLFileState {
  id: number,
  fileType: string,
  filename: string
}

export function createDSLFileState(): IDSLFileState {
  return {
    id: '',
    fileType: '',
    filename: ''
  }
}

