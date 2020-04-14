import React, {useRef} from 'react';
import {useOnMount} from '../../hooks';
import * as Three from 'three';
import UIEditorRenderer from '../../webgl';

// @ts-ignore
import style from './Editor.scss';

export interface IEditorProps {

}



export default function Editor(props: IEditorProps) {
  const ref = useRef(null);
  useOnMount(() => {
    const canvas = ref.current as unknown as HTMLElement;
    new UIEditorRenderer(canvas).paint();
  });
  return (
    <div className={style.editor}>
      <div className={style.canvas_view} ref={ref}/>
    </div>
  )
}

