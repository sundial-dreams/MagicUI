import React from 'react';
import ControlButtonGroup from './ControlButtonGroup';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './index.scss';

export interface INavigationProps {

}

export default function Navigation(props: INavigationProps) {
  return (
    <div className={style.navigation}>
      <ControlButtonGroup/>
      <Menu/>
      <button className={style.setting_btn}>
        <FontAwesomeIcon icon={faCog}/>
      </button>
    </div>
  );
}


