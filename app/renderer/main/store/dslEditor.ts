export interface IDSLFileState {
  id: string,
  fileType: string,
  filename: string,
  code: string,
  folder: string,
  fileId: string
}

export function createDSLFileState(): IDSLFileState {
  return {
    id: '',
    fileId: '',
    fileType: '',
    filename: '',
    code: '',
    folder: ''
  }
}

export interface IDSLCodeState {
  code: string,
  name: string,
  id: string,
  fileId: string
}

export function createDSLCodeState(): IDSLCodeState {
  return {
    code: '',
    name: '',
    id: '',
    fileId: ''
  }
}

export interface IOpenFileItemsState {
  items: IDSLCodeState[],
  currentIndex: number
}

export function createOpenFileItemsState(): IOpenFileItemsState {
  return {
    items: <IDSLCodeState[]>[],
    currentIndex: 0
  }
}

export interface IDSLFileArrayState {
  files: any[]
}

export function createDSLFileArrayState(): IDSLFileArrayState {
  return {
    files: []
  }
}


