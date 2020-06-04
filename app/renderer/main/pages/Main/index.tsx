import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmericanSignLanguageInterpreting } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './index.scss';
import '~resources/style/icon.global.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { Avatar } from '../../../public/components';
import { Routers } from '../../utils/constants';
import { cls } from '../../../public/utils';

interface IMainProps {

}

export default function Main(props: IMainProps) {
  const history = useHistory();
  const user = useSelector((state: IStoreState) => state.user);


  return (
    <div id="page" className={style.main}>
      <div className={style.header_navigation}>
      </div>
      <div className={style.content}>
        <div className={style.logo}>
          <i className="icon icon-M"/>
        </div>
        <div className={style.description}>
          <h4 className={style.text_title}>Welcome to <span>Magic UI</span></h4>
        </div>
        <div className={style.command_wrapper}>
          <h4 className={style.command_item}>Save <span>Ctrl</span> + <span>S</span></h4>
          <h4 className={style.command_item}>Open <span>Ctrl</span> + <span>O</span></h4>
          <h4 className={style.command_item}>Copy <span>Ctrl</span> + <span>C</span></h4>
        </div>
      </div>
      <h5 className={style.copyright}>
        DESIGN BY DENGPENGFEI
      </h5>
      <button className={style.start_btn} onClick={() => history.push(Routers.WEBGL_EDITOR)}>
        Quick Start
      </button>
    </div>
  );
}
