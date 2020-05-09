import { ipcRenderer } from 'electron';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ControlButtonGroup } from '../public/components';
import CanvasEditorRenderer  from '../main/webgl/index';
import { WebGLPCWidget } from '../main/webgl/components/widget';
import {close} from './utils';
import { drawComponentFromJsonObject } from '../main/webgl/utils';
// @ts-ignore
import style from './index.scss';
import Bridge from '../public/utils/bridge';

function App() {
  const container = useRef(null);
  const webglEditor = useRef({});
  useEffect(() => {
    const div = container.current as unknown as HTMLElement;
    webglEditor.current = new CanvasEditorRenderer(
      div,
      (args: any): any => {}
    );
    ipcRenderer.on('jsonCode', (event, args) => {
      const renderer = webglEditor.current as unknown as CanvasEditorRenderer;
      drawComponentFromJsonObject(args as any, renderer);
      renderer.render();
    })
  }, []);

  const handleExport = () => {
    const renderer = webglEditor.current as unknown as CanvasEditorRenderer;
    Bridge.saveFile('base64', renderer.toImage()).then();
  };

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
          <button className={style.export_btn} onClick={handleExport}>EXPORT</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));