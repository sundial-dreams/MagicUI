import React from 'react';
import { WidgetType } from '../../../public/utils/constants';
import Bridge from '../../../public/utils/bridge';
// @ts-ignore
import style from './ControlButtonGroup.scss';


export interface IControlButtonGroupProps {

}

function close() {
  Bridge.close(WidgetType.MAIN);
}

function minimize() {
  Bridge.minimize(WidgetType.MAIN)

}

function maximize() {
  Bridge.maximize(WidgetType.MAIN);
}

export default function ControlButtonGroup(props: IControlButtonGroupProps) {

  return (
    <div className={style.control_button_group}>
      <button onClick={close}/>
      <button onClick={minimize}/>
      <button onClick={maximize}/>
    </div>
  );
}
