import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';
import {Switch, Route, Router} from 'react-router-dom';
import Navigation from './components/navigation';
import Main from './pages/Main';
import WebGLEditor from './pages/WebGLEditor';
import DslCodeEditor from './pages/DslCodeEditor';
import Help from './pages/Help';
import Settings from './pages/Settings';

import Loading from './components/loading';
import { useOnMount } from './hooks';
import { saveSettings, saveUser } from './actions';
import { onCreateWindow, onUpdateUser } from './utils/ipc';

import store from './store';

import ToolBar from './components/toolbar';

import { history, Routers } from './utils/constants';
// @ts-ignore
import style from './index.scss';
import '~resources/style/reset.global.scss';
import Bridge from '../public/utils/bridge';
import { fetchSystemSettings } from './utils/api';


interface IAppProps {
}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const dispatch = useDispatch();
  useOnMount(() => {
    onCreateWindow((data: any) => {
      fetchSystemSettings(data.email).then(res => {
        if (!res.err) {
          dispatch(saveSettings(res.settings));
        }
      });
      dispatch(saveUser(data));
    });
    onUpdateUser((data: any) => {
      console.log('user data', data);
      dispatch(saveUser(data))
    });
  });

  const router = (
    <Router history={history}>
      <Switch>
        <Route path={Routers.MAIN} exact>
          <Main/>
        </Route>
        <Route path={Routers.WEBGL_EDITOR}>
          <WebGLEditor/>
        </Route>
        <Route path={Routers.DSL_CODE_EDITOR}>
          <DslCodeEditor/>
        </Route>
        <Route path={Routers.HELP}>
          <Help/>
        </Route>
        <Route path={Routers.SETTINGS}>
          <Settings/>
        </Route>
      </Switch>
    </Router>
  );
  return (
    <div className={style.app}>
      <ToolBar/>
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
