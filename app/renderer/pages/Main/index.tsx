import React, {useCallback, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import RecentOfUIEditRecord from './RecentOfUIEditRecord';

// @ts-ignore
import style from './index.css';
import StartNavigation from "./StartNavigationBar";

interface IMainProps {

}

export default function Main(props: IMainProps) {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/ui_editor');
  }, [history]);

  return (
    <div id="page" className={style.main}>
      <h2 className={style.main_title}>
        Views
      </h2>
      <div className={style.ui_edit_record_wrapper}>
        <RecentOfUIEditRecord/>
      </div>
      <StartNavigation/>
    </div>
  );
}
