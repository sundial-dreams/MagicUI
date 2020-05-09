import React from 'react';
// @ts-ignore
import style from './components.scss';


export interface IAvatarProps {
  size?: number,
  src: string,
  onClick: () => void,
}

export function Avatar(props: IAvatarProps) {
  const avatarStyle = {
    width: props.size ? props.size + 'px' : '40px',
    height: props.size ? props.size + 'px' : '40px'
  };

  return (
    <div className={style.avatar} style={avatarStyle} onClick={props.onClick}>
      <img src={props.src} alt=""/>
      <div className={style.edit_wrapper}>
        Edit
      </div>
    </div>
  )
}