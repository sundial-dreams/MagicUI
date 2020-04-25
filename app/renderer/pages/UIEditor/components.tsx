import React, {ReactNode, useState} from 'react';
import {drag} from '../../webgl/drag';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

// @ts-ignore
import style from './components.css';
import {cls} from '../../utils';

export interface IUIComponentsItemProps {
  icon: IconProp
  name: string
}

export function UIComponentItem(props: IUIComponentsItemProps) {

  return (
    <button className={style.ui_component_item} draggable onDragStart={drag.bind(null, props.name)}>
      <FontAwesomeIcon icon={props.icon}/>
      <div className={style.name}>{props.name}</div>
    </button>
  );
}

export interface IUIComponentsFoldProps {
  children: ReactNode[] | ReactNode,
  title: string,
  onToggle?: Function,
}

export function UIComponentsFold(props: IUIComponentsFoldProps) {
  const [unfold, setUnfold] = useState(true);
  const handleUnfold = () => {
    setUnfold(unfold => !unfold);
  };

  const length = !props.children ? 0 : Array.isArray(props.children) ? props.children.length + 1 : 1;

  const foldStyle = {
    height: (unfold ? length * 28 + 10 : 28) + 'px'
  };
  return (
    <div className={style.ui_components_fold} style={foldStyle}>
      <button className={cls(style.fold_btn, !unfold && style.fold)} onClick={handleUnfold}>
        <span>
          <FontAwesomeIcon icon={faCaretDown}/>
        </span>
        {props.title}
      </button>
      <div className={style.fold_content}>
        {props.children}
      </div>
    </div>
  );
}