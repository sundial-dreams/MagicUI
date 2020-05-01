import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import style from './index.scss';
import { useOnMount } from '../../hooks';
import { cls } from '../../utils';

export default function toast(text: string, time: number = 700) {
  const div = document.createElement('div');
  const body = document.body;
  body.appendChild(div);

  function destroy() {
    div.parentNode?.removeChild(div);
  }
  interface ILayerProps {
    text: string,
  }
  function Layer(props: ILayerProps) {
    const [hidden, setHidden] = useState(false);
    useOnMount(() => {
      setTimeout(() => {
        setHidden(true);
        setTimeout(destroy, 500);
      }, time);
    });
    return (
      <div className={cls(style.__layer, hidden && style.hidden)}>
        { props.text }
      </div>
    )
  }
  ReactDOM.render(<Layer text={text}/>, div);
}