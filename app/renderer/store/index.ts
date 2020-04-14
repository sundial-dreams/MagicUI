import { createStore } from 'redux';
import { reducer } from '../reducer';

export interface IStoreState {
  count: number
}

export const initialState: IStoreState = {
  count: 0
};

const store = createStore(reducer);

export default store;



