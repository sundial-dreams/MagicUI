import React, { useEffect, useRef } from 'react';
import { useOnMount } from '../../hooks';
import CanvasEditorRenderer, {
  dropComponentToWebGLEditor,
  modifyComponentProperties,
  pasteComponentToWebGLEditor,
  removeComponentFromWebGLEditor,
  webGLToJsonObject
} from '../../webgl';

import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { allowDrop, drop } from '../../webgl/drag';
import { WebGLPCWidget } from '../../webgl/components/widget';
import { WEBGL_COMPONENT_PROP_TYPES } from '../../utils/constants';
import { resetCode } from '../../actions/UIEditor';
import { WidgetName } from '../../../public/utils/constants';
import Bridge from '../../../public/utils/bridge';
// @ts-ignore
import style from './Editor.scss';


export interface IEditorProps {

}


export default function Editor(props: IEditorProps) {
  const ref = useRef(null);
  const webglEditor = useRef({});
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const cpnState = useSelector((state: IStoreState) => state.component);
  const runToolsState = useSelector((state: IStoreState) => state.runTools);
  console.log(cpnState);

  const bgProps = cpnState.props.background;
  const borderProps = cpnState.props.border;
  const shadowProps = cpnState.props.shadow;
  const textProps = cpnState.props.text;
  const imageProps = cpnState.props.image;

  const dispatch = useDispatch();

  useOnMount(() => {
    const container = ref.current as unknown as HTMLElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    webglEditor.current = new CanvasEditorRenderer(container, dispatch);
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    renderer.addComponent(new WebGLPCWidget({ x: (width - 650) / 2, y: (height - 450) / 2 }));
  });

  const bgDeps = [bgProps?.opacity, bgProps?.fill];
  useEffect(() => {
    if (cpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BACKGROUND,
        cpnState.props.background,
        renderer
      );
    }
  }, bgDeps);

  const borderDeps = [borderProps?.fill, borderProps?.radius, borderProps?.width];
  useEffect(() => {
    if (cpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BORDER,
        cpnState.props.border,
        renderer
      );
    }
  }, borderDeps);

  const shadowDeps = [shadowProps?.fill, shadowProps?.blur, shadowProps?.offsetX, shadowProps?.offsetY];
  useEffect(() => {
    if (cpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.SHADOW,
        cpnState.props.shadow,
        renderer
      );
    }
  }, shadowDeps);

  const textDeps = [textProps?.fill, textProps?.text];
  useEffect(() => {
    if (cpnState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.TEXT,
        cpnState.props.text,
        renderer
      );
    }
  }, textDeps);

  useEffect(() => {
    console.log(editToolsState);
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

  const runToolsDeps = [runToolsState.runType];
  console.log('runToolsState', runToolsState);
  useEffect(() => {
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    const jsonObject = webGLToJsonObject(renderer);
    console.log(jsonObject);
    if (jsonObject && runToolsState.runType === 'build') {
      Bridge.open(WidgetName.CODE_VIEWS, jsonObject);
      dispatch(resetCode());
    }
  }, runToolsDeps);

  const handleDropComponent = (data: any) => {
    const id = data.id;
    const position = data.position;
    const view = ref.current as unknown as HTMLElement;
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    const x = position.clientX - view.offsetLeft;
    const y = position.clientY - view.offsetTop;
    if (id) {
      dropComponentToWebGLEditor(id, { x, y }, renderer);
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

