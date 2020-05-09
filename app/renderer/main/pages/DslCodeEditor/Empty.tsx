import React from 'react';
// @ts-ignore
import style from './Empty.scss';

export default function Empty() {

  return (
    <div className={style.empty}>
      <div>
        <h3>Open File</h3>
        <h5>You can open file to write DSL code!</h5>
      </div>
    </div>
  )
}