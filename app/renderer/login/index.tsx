import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Router } from 'react-router-dom';
import Login from './Login';
import { ControlButtonGroup } from '../public/components';
import { close, history, minimize } from './utils';
import Register from './Register';
// @ts-ignore
import style from './index.scss';


function App() {
  const router = (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <Login/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
      </Switch>
    </Router>
  );
  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close} minimize onMinimize={minimize}/>
      </div>
      <div className={style.content}>
        {router}
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
