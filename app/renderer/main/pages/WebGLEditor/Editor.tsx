import { ipcRenderer } from 'electron';
import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { useOnMount } from '../../hooks';
import {
  dropComponentToWebGLEditor, drawComponentFromJsonObject,
  modifyComponentProperties,
  pasteComponentToWebGLEditor,
  removeComponentFromWebGLEditor,
  transformWebGLToJsonObject, webGLComponentToJsonObject
} from '../../webgl/utils';
import CanvasEditorRenderer from '../../webgl';
import { savePage } from '../../utils/api';
import toast from '../../components/toast';


import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { allowDrop, drop } from '../../webgl/drag';
import { WebGLPCWidget } from '../../webgl/components/widget';
import { WEBGL_COMPONENT_PROP_TYPES } from '../../utils/constants';
import { addEditHistory, removeEditHistory, resetCode, resetComponent } from '../../actions/webglEditor';
import { WidgetName } from '../../../public/utils/constants';
import Bridge from '../../../public/utils/bridge';

// @ts-ignore
import style from './Editor.scss';
import { autoSaveWebGLPage, onSocketResult } from '../../utils/ipc';
import { debounce, EventEmitter, throttle } from '../../../public/utils';
import WebGLComponent from '../../webgl/components/components';


export interface IEditorProps {

}


export default function Editor(props: IEditorProps) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const webglEditor = useRef({});
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const cpnState = useSelector((state: IStoreState) => state.component);
  const runToolsState = useSelector((state: IStoreState) => state.runTools);
  const webGLPageState = useSelector((state: IStoreState) => state.webGLPage);
  const editHistory = useSelector((state: IStoreState) => state.editHistory);

  const bgProps = cpnState.props.background;
  const borderProps = cpnState.props.border;
  const shadowProps = cpnState.props.shadow;
  const textProps = cpnState.props.text;
  const positionProps = cpnState.props.position;
  const sizeProps = cpnState.props.size;
  const imageProps = cpnState.props.image;

  console.log(cpnState);

  useOnMount(() => {
    const container = ref.current as unknown as HTMLElement;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    webglEditor.current = new CanvasEditorRenderer(container, dispatch);
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    renderer.addComponent(new WebGLPCWidget({ x: (width - 650) / 2, y: (height - 450) / 2 }));

    EventEmitter.on('auto-save', debounce((pageId: string) => {
      autoSaveWebGLPage({ pageId, page: renderer.toJsonObject() }).then();
    }, 1000));

    onSocketResult((data: any) => {
      if (data.type === 'save-webgl-page') {
        if (!data.err) toast('auto save!');
        else toast('save fail! try save');
      }
    });
  });

  const positionDeps = [positionProps.x, positionProps.y];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'drag-component') {
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, positionDeps);

  const sizeDeps = [sizeProps.width, sizeProps.height];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'transform-component') {
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, sizeDeps);

  const bgDeps = [bgProps?.opacity, bgProps?.fill];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'change-component-background') {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BACKGROUND,
        cpnState.props.background,
        renderer
      );
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, bgDeps);

  const borderDeps = [borderProps?.fill, borderProps?.radius, borderProps?.width];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'change-component-border') {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.BORDER,
        cpnState.props.border,
        renderer
      );
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, borderDeps);

  const shadowDeps = [shadowProps?.fill, shadowProps?.blur, shadowProps?.offsetX, shadowProps?.offsetY];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'change-component-shadow') {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.SHADOW,
        cpnState.props.shadow,
        renderer
      );
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, shadowDeps);

  const textDeps = [textProps?.fill, textProps?.text];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'change-component-text') {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.TEXT,
        cpnState.props.text,
        renderer
      );
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, textDeps);

  const imageDeps = [imageProps?.src];
  useEffect(() => {
    if (cpnState.id && cpnState.operator === 'change-component-image') {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      modifyComponentProperties(
        cpnState.id,
        WEBGL_COMPONENT_PROP_TYPES.IMAGE,
        cpnState.props.image,
        renderer
      );
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  }, imageDeps);

  const editToolsDeps = [editToolsState.id, editToolsState.editType];
  useEffect(() => {
    if (editToolsState.id) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      console.log(editToolsState);
      switch (editToolsState.editType) {
        case 'delete': {
          const rmCpn = removeComponentFromWebGLEditor(editToolsState.id, renderer);
          EventEmitter.emit('auto-save', webGLPageState.pageId);
          dispatch(addEditHistory(editToolsState.id, 'delete', {old: '', new: webGLComponentToJsonObject(rmCpn as WebGLComponent)}));
          return;
        }
        case 'paste': {
          const newCpn = pasteComponentToWebGLEditor(editToolsState.id, renderer);
          dispatch(addEditHistory(editToolsState.id, 'paste', {old: '', new: newCpn?.getId()}))
          EventEmitter.emit('auto-save', webGLPageState.pageId);
          return;
        }
        case 'save': {
          savePage(webGLPageState.pageId, renderer.toJsonObject() as object).then((v: any) => {
            if (!v.err) {
              toast('save!');
              dispatch(resetComponent());
            }
          });
          return;
        }
        case 'undo': {
          console.log('undo');
          dispatch(removeEditHistory());
          dispatch(resetComponent());
          return;
        }
        default: {
          return;
        }
      }
    }
  }, editToolsDeps);

  const runToolsDeps = [runToolsState.runType];
  useEffect(() => {
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    switch (runToolsState.runType) {
      case 'build': {
        const jsonObject = transformWebGLToJsonObject(renderer);
        Bridge.open(WidgetName.CODE_VIEWS, {
          type: 'json',
          data: jsonObject
        });
        dispatch(resetCode());
        return;
      }
      case 'export': {
        const data = renderer.toImage();
        Bridge.saveFile('base64', data).then((filename) => {
          dispatch(resetCode());
          toast(`save to ${filename}`, 1000);
        });
      }
    }
  }, runToolsDeps);

  const webGLPageDeps = [webGLPageState.pageId];
  useEffect(() => {
    const container = ref.current as unknown as HTMLElement;
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const page = webGLPageState.page;
    renderer.clear();
    if (!page) {
      renderer.addComponent(new WebGLPCWidget({ x: (width - 650) / 2, y: (height - 450) / 2 }));
      return;
    }
    drawComponentFromJsonObject(page, renderer);
  }, webGLPageDeps);

  const historyDeps = [editHistory.history.length, editHistory.current];
  useEffect(() => {
    console.log('history', editHistory);
    if (editHistory.current) {
      const renderer = (webglEditor.current as CanvasEditorRenderer);
      switch (editHistory.current.operator) {
        case 'paste': {
          const {id, data} = editHistory.current;
          renderer.removeComponent(data.new);
          return;
        }
        case 'delete': {
          const {id, data} = editHistory.current;
          drawComponentFromJsonObject(data.new, renderer);
          return;
        }
        default: {
          return;
        }
      }
    }
  }, historyDeps);

  const handleDropComponent = (data: any) => {
    const { type, name, position } = data;
    const view = ref.current as unknown as HTMLElement;
    const renderer = (webglEditor.current as CanvasEditorRenderer);
    const x = position.clientX - view.offsetLeft;
    const y = position.clientY - view.offsetTop;
    if (data) {
      dropComponentToWebGLEditor(type, name, { x, y }, renderer);
      EventEmitter.emit('auto-save', webGLPageState.pageId);
    }
  };

  return (
    <div className={style.editor}>
      <div id="canvas_view" className={style.canvas_view} ref={ref} onDrop={drop.bind(null, handleDropComponent)}
           onDragOver={allowDrop}/>
      <div className={style.editor_status_bar}>
        <ComponentPath path={cpnState.path || ''}/>
      </div>
    </div>
  );
}

function ComponentPath(props: { path: string }) {
  const p = props.path.split('>').reverse();
  const content = p.map((v, i) => {
    if (i === p.length - 1) return <span>{v.split('_').join(' ').toLocaleUpperCase()}</span>;

    return (<>
      <span>{v.split('_').join(' ').toLocaleUpperCase()}</span>
      <span className={style.arrow}>
        <FontAwesomeIcon icon={faLongArrowAltRight}/>
      </span>
    </>);
  });
  return (
    <div className={style.component_path}>
      {content}
    </div>
  );
}

