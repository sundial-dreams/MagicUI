import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './Empty.scss';

export default function Empty() {

  return (
    <div className={style.empty}>
      <div>
        <div className={style.logo}>
          <FontAwesomeIcon icon={faFolderOpen}/>
        </div>
        <h3>Open File</h3>
        <h5>You can open file to write DSL code!</h5>
      </div>
    </div>
  )
}