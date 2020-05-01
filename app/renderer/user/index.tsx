import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import style from './index.scss';

function App() {
  return (
    <div className={style.user_page}>
      Hello
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('app'));