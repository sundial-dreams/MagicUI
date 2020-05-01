export interface IEditToolsState {
  id: string,
  editType: string
}

export function createEditToolsState(): IEditToolsState {
  return {
    id: '',
    editType: ''
  }
}

export interface IComponentState {
  id: string,
  name: string,
  props: {
    position: {x:number, y: number},
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
      fill: string
    },
    image?: {
      image: string
    }
  }
}

export function createComponentState(): IComponentState {
  return {
    id: '',
    name: '',
    props: {
      position: {x: 0, y: 0},
      size: {width: 0, height: 0}
    }
  }
}

export interface IRunToolsState {
  runType: string
}

export function createRunToolsState(): IRunToolsState {
  return {
    runType: ''
  }
}

