import React, {useEffect, useRef} from 'react';
import {useOnMount, useResize} from '../../hooks';
import CanvasEditorRenderer, {
  dropComponentToWebGLEditor,
  modifyComponentProperties,
  pasteComponentToWebGLEditor,
  removeComponentFromWebGLEditor
} from '../../webgl';

import {useDispatch, useSelector} from 'react-redux';
import {IEditToolsStore, IStoreState} from '../../store';
import {allowDrop, drop} from '../../webgl/drag';
import {WebGLPCWidget} from '../../webgl/components/widget';
import {WEBGL_COMPONENT_PROP_TYPES} from '../../utils/constants';

// @ts-ignore
import style from './Editor.css';

export interface IEditorProps {

}


export default function Editor(props: IEditorProps) {
  const ref = useRef(null);
  const webglEditor = useRef({});
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const curCpnState = useSelector((state: IStoreState) => state.currentComponent);
  const bgProps = curCpnState.props.background;
  const borderProps = curCpnState.props.border;
  const shadowProps = curCpnState.props.shadow;
  const textProps = curCpnState.props.text;
  const imageProps = curCpnState.props.image;

  const dispatch = useDispatch();

  useOnMount(() => {
    const container = ref.current as unknown as HTMLElement;
    webglEditor.current = new CanvasEditorRenderer(container, dispatch);
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    renderer.addComponent(new WebGLPCWidget({x: 20, y: 20}));
  });

  const bgDeps = [bgProps?.opacity, bgProps?.fill];
  useEffect(() => {
    if (curCpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        curCpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BACKGROUND,
        curCpnState.props.background,
        renderer
      );
    }
  }, bgDeps);

  const borderDeps = [borderProps?.fill, borderProps?.radius, borderProps?.width];
  useEffect(() => {
    if(curCpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        curCpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BORDER,
        curCpnState.props.border,
        renderer
      );
    }
  }, borderDeps);

  const shadowDeps = [shadowProps?.fill, shadowProps?.blur, shadowProps?.offsetX, shadowProps?.offsetY];
  useEffect(() => {
    if (curCpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        curCpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.SHADOW,
        curCpnState.props.shadow,
        renderer
      )
    }
  }, shadowDeps);

  const textDeps = [textProps?.fill, textProps?.text];
  useEffect(() => {
    if (curCpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        curCpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.TEXT,
        curCpnState.props.text,
        renderer
      )
    }
  }, textDeps);

  useEffect(() => {
    if (editToolsState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      console.log(editToolsState);
      switch (editToolsState.editType) {
        case 'delete': {
          removeComponentFromWebGLEditor(editToolsState.id, renderer);
          return;
        }
        case 'paste': {
          pasteComponentToWebGLEditor(editToolsState.id, renderer);
          return;
        }
        default: {
          return;
        }
      }
    }
  }, [editToolsState.id, editToolsState.editType]);

  const handleDropComponent = (data: any) => {
    const id = data.id;
    const position = data.position;
    const view = ref.current as unknown as HTMLElement;
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    const x = position.clientX - view.offsetLeft;
    const y = position.clientY - view.offsetTop;
    if (id) {
      dropComponentToWebGLEditor(id, {x, y}, renderer);
    }
  };

  return (
    <div className={style.editor}>
      <div id="canvas_view" className={style.canvas_view} ref={ref} onDrop={drop.bind(null, handleDropComponent)}
           onDragOver={allowDrop}/>
      <div className={style.editor_status_bar}>

      </div>
    </div>
  );
}

