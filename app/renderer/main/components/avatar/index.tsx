import React from 'react';
// @ts-ignore
import style from './index.scss';

export interface IAvatarProps {
  size?: number,
  src: string,
  onClick: () => void,
}

export function Avatar(props: IAvatarProps) {

  return (
    <div className={style.avatar} onClick={props.onClick}>
      <img src={props.src} alt=""/>
    </div>
  )
}
