import React from 'react';
import {useSelector} from 'react-redux';
import ControlButtonGroup from './ControlButtonGroup';
import Menu from './Menu';

// @ts-ignore
import style from './index.scss';
import {Avatar} from '../avatar';
import {cls} from '../../utils';

export interface INavigationProps {

}

export default function Navigation(props: INavigationProps) {
  return (
    <div className={style.navigation}>
      <ControlButtonGroup/>
      <Menu/>
      <button className={style.setting_btn}>
        <i className={cls(style.icon, style.icon_settings)}/>
      </button>
    </div>
  );
}


export const HeaderNavigation: React.FC = (props) => {
  console.log(require('~resources/images/avatar.jpg'));
  return (
    <div className={style.header_navigation}>
      <div className={style.right_content}>
        <Avatar src={require('~resources/images/avatar.jpg').default} onClick={() => {}}/>
      </div>
    </div>
  )
};