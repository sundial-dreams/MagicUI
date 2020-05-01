import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ControlButtonGroup } from '../public/components';
import CanvasEditorRenderer  from '../main/webgl/index';
import { WebGLPCWidget } from '../main/webgl/components/widget';
import {close} from './utils';
// @ts-ignore
import style from './index.scss';

function App() {
  const container = useRef(null);
  useEffect(() => {
    const div = container.current as unknown as HTMLElement;
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    const renderer = new CanvasEditorRenderer(
      div,
      (args: any): any => {}
    );
    renderer.addComponent(new WebGLPCWidget({x: (width - 650) / 2, y: (height - 450) / 2}));
    renderer.render();
  }, []);

  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close}/>
      </div>
      <div className={style.content}>
        <div className={style.views_wrapper}>
          <div id="canvas_view" className={style.canvas_view} ref={container}/>
        </div>
        <div className={style.operate_btn}>
          <button className={style.export_btn}>EXPORT</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));