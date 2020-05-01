import React, { useCallback, useEffect, useRef } from 'react';
import * as Three from 'three';
import { useHistory } from 'react-router';
import ComponentsPanel from './ComponentsPanel';

import Editor from './Editor';
import PropertiesPanel from './PropertiesPanel';
import Menu, { ItemSection, MenuItem } from '../../components/menu';
import EditTools from './EditTools';
import RunTools from './RunTools';

// @ts-ignore
import style from './index.scss';
import modal from '../../components/modal';
import { NewPageModal } from './components';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';

export interface IUIEditorProps {

}

export default function UIEditor(props: IUIEditorProps) {

  return (
    <div id='page' className={style.ui_editor}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <EditorMenu/>
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


function EditorMenu() {
  const user = useSelector((state: IStoreState) => state.user);
  const handleNewPage = () => {
    modal(cancel => <NewPageModal cancel={cancel} email={user.email}/>);
  };

  return (
    <Menu>
      <MenuItem name="Pages">
        <ItemSection text="New" onClick={handleNewPage}/>
        <ItemSection text="Delete"/>
      </MenuItem>
      <MenuItem name="Edit">
        <ItemSection text="Copy"/>
        <ItemSection text="Cut"/>
        <ItemSection text="Paste"/>
        <ItemSection text="Save"/>
        <ItemSection text="Delete"/>
      </MenuItem>
      <MenuItem name="Run">
        <ItemSection text="Build"/>
        <ItemSection text="Run Dev"/>
        <ItemSection text="Export"/>
      </MenuItem>
    </Menu>
  );
}