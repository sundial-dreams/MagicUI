import { createStore } from 'redux';
import reducer from '../reducer';

export interface IEditToolsStore {
  id: string,
  editType: string
}

function createEditToolsStore(): IEditToolsStore {
  return {
    id: '',
    editType: ''
  }
}

export interface IComponentStore {
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

function createCurrentComponentStore(): IComponentStore {
  return {
    id: '',
    name: '',
    props: {
      position: {x: 0, y: 0},
      size: {width: 0, height: 0},
    }
  }
}


export interface IStoreState {
  editTools: IEditToolsStore,
  currentComponent:IComponentStore
}

function createInitialStore(): IStoreState {
  return {
    editTools: createEditToolsStore(),
    currentComponent: createCurrentComponentStore()
  }
}


export const initialState = createInitialStore();

const store = createStore(reducer);

export default store;



