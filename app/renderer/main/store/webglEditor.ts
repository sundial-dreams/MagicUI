export interface IEditToolsState {
  id: string,
  editType: string
}

export function createEditToolsState(): IEditToolsState {
  return {
    id: '',
    editType: ''
  };
}

export interface IComponentState {
  id: string,
  name: string,
  cpnType: string,
  path?: string,
  operator?: string
  props: {
    position: { x: number, y: number },
    size: {
      width: number,
      height: number
    },
    background?: {
      fill: string,
      opacity: number
    },
    border?: {
      width: number,
      radius: number,
      fill: string
    },
    shadow?: {
      offsetX: number,
      offsetY: number,
      blur: number,
      fill: string
    },
    text?: {
      text: string,
      fill: string,
      fontSize: number
    },
    image?: {
      src: string
    }
  }
}

export function createComponentState(): IComponentState {
  return {
    id: '',
    name: '',
    cpnType: '',
    props: {
      position: { x: 0, y: 0 },
      size: { width: 0, height: 0 }
    }
  };
}

export interface IRunToolsState {
  runType: string,
  data?: string
}


export function createRunToolsState(): IRunToolsState {
  return {
    runType: '',
    data: ''
  };
}

export type TRawComponent = {
  id: string,
  type: string,
  name: string,
  props: any,
  children: TRawComponent[]
};

export interface IWebGLPageState {
  id: string,
  pageId: string,
  createTime?: number,
  description?: string,
  page: TRawComponent | null,
  name: string
}

export function createCurrentWebGLPageState(): IWebGLPageState {
  return {
    id: '',
    pageId: '',
    name: '',
    page: null,
    createTime: 0,
    description: ''
  };
}

export interface IEditHistoryState {
  history: {
    id: string, // component id
    operator: string,
    data: { old: any, new: any }
  }[],
  current?: { id: string, operator: string, data: { old: any, new: any } }
}

export function createEditHistoryState(): IEditHistoryState {
  return {
    history: []
  };
}

export interface IWebGLPageListState {
  webglPageList: {
    id: string,
    name: string,
    pageId: string
  }[],
  currentWebGlPage: {
    id: string,
    name: string,
    pageId: string
  }
}

export function createWebGLPageListSate(): IWebGLPageListState {
  return {
    webglPageList: [],
    currentWebGlPage: {
      id: '',
      name: '',
      pageId: ''
    }
  };
}

export interface IAutoSaveLoadingState {
  loading: boolean,
}

export function createAutoSaveLoadingState(): IAutoSaveLoadingState {
  return {
    loading: false
  }
}