import React from 'react';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import Bridge from '../../../public/utils/bridge';
import { WidgetType } from '../../../public/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCalendarCheck, faChartBar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '../avatar';
import { history, Routers } from '../../utils/constants';

// @ts-ignore
import style from './index.scss';


const ToolBar: React.FC = (props) => {
  const user = useSelector((state: IStoreState) => state.user);
  const handleAvatarClick = () => {
    Bridge.open(WidgetType.USER, user);
  };

  return (
    <div className={style.header_navigation}>
      <div className={style.right_content}>
        <div className={style.tools_bar}>
          <button className={style.help_btn} onClick={() => history.push(Routers.HELP)}>
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
          <Avatar src={user.avatar as string} onClick={handleAvatarClick}/>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;