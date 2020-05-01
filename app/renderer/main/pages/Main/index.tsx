import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';

// @ts-ignore
import style from './index.scss';

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
    </div>
  );
}
