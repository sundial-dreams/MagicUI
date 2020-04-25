import React from 'react';
import {useSelector} from 'react-redux';
import ControlButtonGroup from './ControlButtonGroup';
import Menu from './Menu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faInfoCircle, faBell, faCalendarCheck, faChartBar, faCog} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './index.css';
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
        <FontAwesomeIcon icon={faCog}/>
      </button>
    </div>
  );
}


export const HeaderNavigation: React.FC = (props) => {
  return (
    <div className={style.header_navigation}>
      <div className={style.right_content}>
        <div className={style.tools_bar}>
          <button className={style.help_btn}>
            <FontAwesomeIcon icon={faInfoCircle}/>
          </button>
          <button className={style.todo_btn}>
            <FontAwesomeIcon icon={faCalendarCheck}/>
          </button>
          <button className={style.msg_btn}>
            <FontAwesomeIcon icon={faBell}/>
          </button>
          <button className={style.chart_btn}>
            <FontAwesomeIcon icon={faChartBar}/>
          </button>
        </div>
        <div className={style.avatar_wrapper}>
          <Avatar src={require('~resources/images/avatar.jpg').default} onClick={() => {}}/>
        </div>
      </div>
    </div>
  );
};