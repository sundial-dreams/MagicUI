import React, {useRef} from 'react';
import {useOnMount} from '../../hooks';
import * as Three from 'three';
import CanvasEditorRenderer from '../../webgl';

// @ts-ignore
import DragControls from 'three-dragcontrols/lib/index.module';

// @ts-ignore
import style from './Editor.scss';

export interface IEditorProps {

}


export default function Editor(props: IEditorProps) {
  const ref = useRef(null);
  useOnMount(() => {
    const container = ref.current as unknown as HTMLElement;
    new CanvasEditorRenderer(container).render();
  });
  return (
    <div className={style.editor}>
      <div className={style.canvas_view} ref={ref}/>
    </div>
  );
}

