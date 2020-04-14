import React, {useCallback, useEffect, useRef} from 'react';
import * as Three from 'three';
import {useHistory} from 'react-router';
import ComponentsPanel from './ComponentsPanel';
// @ts-ignore
import style from './index.scss';
import Editor from './Editor';
import PropertiesPanel from './PropertiesPanel';

export interface IUIEditorProps {

}

export default function UIEditor(props: IUIEditorProps) {

  return (
    <div id='page' className={style.ui_editor}>
      <div className={style.header_navigation}>
      </div>
      <div className={style.content}>
        <div className={style.left_panel}>
          <ComponentsPanel/>
        </div>
        <div className={style.middle_panel}>
          <Editor/>
        </div>
        <div className={style.right_panel}>
          <PropertiesPanel/>
        </div>
      </div>
    </div>
  );
}