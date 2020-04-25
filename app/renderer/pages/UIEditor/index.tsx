import React, {useCallback, useEffect, useRef} from 'react';
import * as Three from 'three';
import {useHistory} from 'react-router';
import ComponentsPanel from './ComponentsPanel';
// @ts-ignore
import style from './index.css';
import Editor from './Editor';
import PropertiesPanel from './PropertiesPanel';
import Menu, {ItemSection, MenuItem} from '../../components/menu';
import EditTools from './EditTools';
import RunTools from './RunTools';

export interface IUIEditorProps {

}

export default function UIEditor(props: IUIEditorProps) {

  return (
    <div id='page' className={style.ui_editor}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <Menu>
            <MenuItem name="File">
              <ItemSection text="add"/>
              <ItemSection text="add"/>
            </MenuItem>
            <MenuItem name="View">
              <ItemSection text="add"/>
              <ItemSection text="add"/>
            </MenuItem>
            <MenuItem name="Run">
              <ItemSection text="add"/>
              <ItemSection text="add"/>
            </MenuItem>
          </Menu>
        </div>
        <div className={style.run_tools_wrapper}>
          <RunTools/>
        </div>
        <div className={style.edit_tools_wrapper}>
          <EditTools/>
        </div>
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