import React from 'react';
import { WindowManager } from './utils';

// @ts-ignore
import style from './components.scss';

export function ControlButtonGroup(props: any) {

  return (
    <div className={style.control_button_group}>
      <button onClick={ WindowManager.close }/>
      <button/>
      <button/>
    </div>
  )
}
