import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import { ControlButtonGroup } from '../public/components';
import { close, minimize } from './utils';
// @ts-ignore
import style from './index.scss';


function App() {

  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close} minimize onMinimize={minimize}/>
      </div>
      <div className={style.content}>
        <Login/>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
