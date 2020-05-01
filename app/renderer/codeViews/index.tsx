import React from 'react';
import ReactDOM from 'react-dom';
import { ControlButtonGroup } from '../public/components';
import Views from './views';
import {close} from './utils';

// @ts-ignore
import style from './index.scss';


interface IAppProps {

}

function App(props: IAppProps) {
  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close}/>
      </div>
      <div className={style.content}>
        <Views/>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));

