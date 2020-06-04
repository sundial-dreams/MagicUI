import React from 'react';
// @ts-ignore
import style from './confirm.scss';

export default function Confirm(props: { title: string, cancel: () => void, confirm: () => void }) {

  return (
    <div className={style.confirm}>
      <h4>{props.title}</h4>
      <div className={style.buttons}>
        <button className={style.cancel_btn} onClick={props.cancel}>cancel</button>
        <button className={style.confirm_btn} onClick={props.confirm}>confirm</button>
      </div>
    </div>
  );
}