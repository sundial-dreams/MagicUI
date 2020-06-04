import React from 'react';
import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';
// @ts-ignore
import style from './components.scss';

export function ControlButtonGroup(props: any) {

  return (
    <div className={style.control_button_group}>
      <button onClick={ () => Bridge.close(WidgetType.CODE) }/>
      <button/>
      <button/>
    </div>
  )
}
