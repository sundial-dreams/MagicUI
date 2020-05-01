import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';
import {Switch, Route, Router} from 'react-router-dom';
import Navigation, {HeaderNavigation} from './components/navigation';
import Main from './pages/Main';
import UIEditor from './pages/WebGLEditor';
import CodeEditor from './pages/CodeEditor';

import store from './store';

import {history} from './utils/constants';
// @ts-ignore
import style from './index.scss';
import '~resources/style/reset.global.scss';
import Loading from './components/loading';
import { useOnMount } from './hooks';
import { saveUser } from './actions';
import { onCreateWindow } from './utils/ipc';

interface IAppProps {
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const dispatch = useDispatch();
  useOnMount(() => {
    onCreateWindow((data: any) => {
      dispatch(saveUser(data));
    });
  });

  const router = (
    <Router history={history}>
      <Switch>
        <Route path='/' exact>
          <Loading/>
        </Route>
        <Route path='/ui_editor'>
          <UIEditor/>
        </Route>
        <Route path='/code_editor'>
          <CodeEditor/>
        </Route>
      </Switch>
    </Router>
  );
  return (
    <div className={style.app}>
      <HeaderNavigation/>
      <div className={style.navigation_wrapper}>
        <Navigation/>
      </div>
      <div className={style.page_wrapper}>
        {router}
      </div>
    </div>
  );
};


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
