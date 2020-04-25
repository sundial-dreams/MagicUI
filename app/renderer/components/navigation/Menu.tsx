import React, {ReactNode, useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faMagic, faCode, faImage} from '@fortawesome/free-solid-svg-icons';
import {cls} from '../../utils';
// @ts-ignore
import style from './Menu.css';
// @ts-ignore
import '../../../../resources/style/icon.global.css'
import {history, Routers} from '../../utils/constants';

interface IMenuItemProps {
  onClick: () => void,
  icon: ReactNode,
  active: boolean
}

const MenuItem: React.FC<IMenuItemProps> = (props: IMenuItemProps) => {

  return (
    <div className={cls(style.menu_item, props.active && style.active)} onClick={props.onClick}>
      {props.icon}
    </div>
  );
};

export interface IMenuProps {
}

const menus = [
  {
    icon: <FontAwesomeIcon icon={faMagic}/>,
    path: Routers.MAIN
  },
  {
    icon: <FontAwesomeIcon icon={faEdit}/>,
    path: Routers.UI_EDITOR
  },
  {
    icon: <FontAwesomeIcon icon={faCode}/>,
    path: Routers.CODE_EDITOR
  },
  {
    icon: <FontAwesomeIcon icon={faImage}/>,
    path: ""
  }
];

export default function Menu(props: IMenuProps) {
  const [cur, setCur] = useState(0);
  const m = menus.map(({icon, path}, i) => {
      const click = () => {
        setCur(i);
        history.push(path);
      };
      const active = i === cur;
      return (
        <MenuItem key={i} icon={icon} onClick={click} active={active}/>
      );
    }
  );
  return (
    <div className={style.menu}>
      {m}
    </div>
  );
}
