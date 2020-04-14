import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {cls} from '../../utils';
// @ts-ignore
import style from './Menu.scss';
import {history, Routers} from '../../utils/constants';

interface IMenuItemProps {
  onClick: () => void,
  icon: string,
  active: boolean
}

const MenuItem: React.FC<IMenuItemProps> = (props: IMenuItemProps) => {

  return (
    <div className={cls(style.menu_item, props.active && style.active)} onClick={props.onClick}>
      <i className={props.icon}/>
    </div>
  );
};

export interface IMenuProps {
}

const menus = [
  {
    icon: cls(style.icon, style.icon_add_folder),
    path: Routers.MAIN
  },
  {
    icon: cls(style.icon, style.icon_pencil),
    path: Routers.UI_EDITOR
  },
  {
    icon: cls(style.icon, style.icon_circled),
    path: ''
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
