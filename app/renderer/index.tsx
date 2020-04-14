import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer as ReactHotAppContainer} from 'react-hot-loader';
import {Switch, Route, Router} from 'react-router-dom';
import Navigation, {HeaderNavigation} from './components/navigation';
import Main from './pages/Main';
import UIEditor from './pages/UIEditor';

import store from './store';
import {history} from './utils/constants';

// @ts-ignore
import style from './index.scss';
import '~resources/style/reset.global.scss';


interface IAppProps {

}

const App: React.FC<IAppProps> = (props: IAppProps) => {

  return (
    <div className={style.app}>
      <HeaderNavigation/>
      <div className={style.navigation_wrapper}>
        <Navigation/>
      </div>
      <div className={style.page_wrapper}>
        <Router history={history}>
          <Switch>
            <Route path='/' exact>
              <Main/>
            </Route>
            <Route path='/ui_editor'>
              <UIEditor/>
            </Route>
          </Switch>
        </Router>
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
