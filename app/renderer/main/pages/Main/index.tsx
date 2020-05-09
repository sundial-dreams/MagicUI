import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

// @ts-ignore
import style from './index.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { Avatar } from '../../../public/components';
import { Routers } from '../../utils/constants';

interface IMainProps {

}

export default function Main(props: IMainProps) {
  const history = useHistory();
  const user = useSelector((state: IStoreState) => state.user);


  return (
    <div id="page" className={style.main}>
      <div className={style.header_navigation}>

      </div>
      <div className={style.image_wrapper}>
        <img src={require('~resources/images/app-run.png').default} alt="none"/>
      </div>
      <div className={style.intro}>
        <div className={style.avatar_wrapper}>
          <Avatar src={user.avatar as string} size={100}/>
          <div className={style.user_info}>
            <h3 className={style.nickname}>{user.nickname}</h3>
            <h4 className={style.email}>{ user.email }</h4>
          </div>
        </div>
        <div className={style.intro_text}>
          <h4>
            A man who dares to waste one hour of time has not discovered the value of life!
          </h4>
        </div>
      </div>
      <h5 className={style.copyright}>
        DESIGN BY DENGPENGFEI
      </h5>
      <button className={style.start_btn} onClick={() => history.push(Routers.UI_EDITOR)}>
        Quick Start
      </button>
    </div>
  );
}
