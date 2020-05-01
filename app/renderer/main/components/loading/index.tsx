import React, { useRef } from 'react';
import style from './index.scss';

export default function Loading() {
  return (
    <div className={style.loading}>
      <div className={style.loading_container}>
        <svg height="250" width="400">
          <path className={style.pulsar} stroke="darkmagenta" fill="rgba(0, 0, 0, .2)" stroke-width="5" stroke-linejoin="round"
                d="M0,90L250,90Q257,60 262,87T267,95 270,88 273,92t6,35 7,-60T290,127 297,107s2,-11 10,-10 1,1 8,-10T319,95c6,4 8,-6 10,-17s2,10 9,11h210"/>
        </svg>
        <h4>LOADING...</h4>
      </div>
    </div>
  );
}