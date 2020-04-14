import React from 'react';
import { WindowManager } from '../../utils/call';
// @ts-ignore
import style from './ControlButtonGroup.scss';


export interface IControlButtonGroupProps {

}

export default function ControlButtonGroup(props: IControlButtonGroupProps) {

  return (
    <div className={style.control_button_group}>
      <button onClick={ WindowManager.close }/>
      <button onClick={ WindowManager.minimize } />
      <button onClick={ WindowManager.maximize }/>
    </div>
  )
}
