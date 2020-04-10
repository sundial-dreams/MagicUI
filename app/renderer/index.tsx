import React, {ChangeEvent, Fragment, useCallback, useEffect, useState} from 'react';
import Electron, {ipcRenderer} from 'electron';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStore, Action} from 'redux';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';

// @ts-ignore
import style from './index.scss';

type StoreType = {
  count: number,
  token: string
};

enum ActionTypes {
  INCREASE,
  DECREASE,
  UPDATE_TOKEN
}

const initialState: StoreType = {
  count: 0,
  token: ''
};

function reducer(state: StoreType = initialState, action: Action<number> & StoreType): StoreType {
  switch (action.type) {
    case ActionTypes.INCREASE: {
      return {...state, count: action.count};
    }
    case ActionTypes.DECREASE: {
      return {...state, count: action.count};
    }
    case ActionTypes.UPDATE_TOKEN: {
      return {...state, token: action.token};
    }
    default: {
      return state;
    }
  }
}

const store = createStore(reducer);

function Counter(props: any): React.ComponentElement<any, any> {
  const count = useSelector((state: StoreType) => state.count);
  const dispatch = useDispatch();
  const increase = () => dispatch({type: ActionTypes.INCREASE, count: count + 1});
  const decrease = () => dispatch({type: ActionTypes.DECREASE, count: count - 1});

  return (
    <div className={style.counter}>
      <button onClick={increase}>+</button>
      <span>{count}</span>
      <button onClick={decrease}>-</button>
    </div>
  );
}

function useInput(defaultValue = ''): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(defaultValue);
  const change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };
  return [value, change];
}


function NativeTest(props: any): React.ComponentElement<any, any> {
  const dispatch = useDispatch();
  const [value, change] = useInput();

  const click = async () => {
    const ret = await ipcRenderer.invoke('parse_ast', value);
    dispatch({ type: ActionTypes.UPDATE_TOKEN, token: ret.token });
  };

  return (
    <div className={style.nativeTest}>
      <input onChange={change}/>
      <button onClick={click}>Native Call</button>
    </div>
  );
}

function App(props: any): React.ComponentElement<any, any> {
  const token = useSelector((state: StoreType) => state.token);

  return (
    <div className={style.page}>
      <div className={style.counterWrapper}>
        <Counter/>
      </div>
      <div className={style.nativeTestWrapper}>
        <NativeTest/>
      </div>
      <div className={style.nativeShow}>
        {token}
      </div>
    </div>
  );
}


const AppContainer = process.env.NODE_ENV === 'development' ? ReactHotAppContainer : Fragment;
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
});
