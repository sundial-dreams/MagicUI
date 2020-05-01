import React from 'react';

import { cls } from '../utils';
import { close } from '../../webglViews/utils';
// @ts-ignore
import style from './index.scss';

export interface IControlButtonGroupProps {
  close?: boolean,
  onClose?: () => void,
  minimize?: boolean,
  onMinimize?: () => void,
  maximize?: boolean,
  onMaximize?: () => void
}

const noop = () => {
};

export function ControlButtonGroup(props: IControlButtonGroupProps) {

  return (
    <div className={style.control_button_group}>
      <button className={cls(!props.close && style.disable)}
              disabled={!props.close}
              onClick={props.onClose || noop}/>
      <button className={cls(!props.minimize && style.disable)}
              disabled={!props.minimize}
              onClick={props.onMinimize || noop}/>
      <button className={cls(!props.maximize && style.disable)}
              disabled={!props.maximize}
              onClick={props.onMaximize || noop}/>
    </div>
  );
}


export interface IAvatarProps {
  size?: number,
  src: string,
  onClick?: () => void,

}

export function Avatar(props: IAvatarProps) {
  const avatarStyle = {
    width: props.size ? props.size + 'px' : '40px',
    height: props.size ? props.size + 'px' : '40px'
  };
  return (
    <div className={style.avatar} style={avatarStyle} onClick={props.onClick}>
      <img src={props.src} alt=""/>
    </div>
  );
}