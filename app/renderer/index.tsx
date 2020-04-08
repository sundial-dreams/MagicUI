// @ts-ignore
import React, {Fragment, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createStore, Action} from 'redux';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';
// @ts-ignore
import style from './index.scss';

const initialState = {
  count: 0
};

const INC = 'inc';
const DES = 'des';

const store = createStore((state: any = initialState, actions: Action<string> & { count: number }) => {
  switch (actions.type) {
    case INC: {
      return {...state, count: actions.count + 1};
    }
    case DES: {
      return {...state, count: actions.count - 1};
    }
    default: {
      return state;
    }
  }
});

function Com() {
  return (
    <div className={style.com}>
      function
    </div>
  )
}

function App() {
  const count = useSelector((state: { count: number }) => state.count);
  const dispatch = useDispatch();
  const inc = () => dispatch({type: INC, count: count + 1});
  const des = () => dispatch({type: DES, count: count - 1});

  return (
    <div className={style.app}>
      <button onClick={inc}>+</button>
      <span>{count}</span>
      <button onClick={des}>-</button>
      <Com/>
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
