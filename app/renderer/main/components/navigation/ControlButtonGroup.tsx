import React from 'react';
import { WidgetName } from '../../../public/utils/constants';
import Bridge from '../../../public/utils/bridge';
// @ts-ignore
import style from './ControlButtonGroup.scss';


export interface IControlButtonGroupProps {

}

function close() {
  Bridge.close(WidgetName.MAIN);
}

function minimize() {
  Bridge.minimize(WidgetName.MAIN)

}

function maximize() {
  Bridge.maximize(WidgetName.MAIN);
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
