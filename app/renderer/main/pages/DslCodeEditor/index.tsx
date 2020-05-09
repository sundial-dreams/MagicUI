import React, { useState } from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import DSLCodeEditor from './Editor';
import { EditorMenu } from './EditorMenu';
import ProjectTree from './ProjectTree';
import RunTools from './RunTools';
import FileTabs from './FileTabs';

// @ts-ignore
import style from './index.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import Empty from './Empty';

const cachedOpenFile = [];

export interface ICodeEditor {

}


export default function CodeEditor(props: ICodeEditor) {
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const openFile = useSelector((state: IStoreState) => state.openFileItems);
  const content = openFile.items.length > 0 ? (<>
    <div className={style.file_tab_wrapper}>
      <FileTabs/>
    </div>
    <div className={style.editor_wrapper}>
      <DSLCodeEditor/>
    </div>
  </>) : (<Empty/>);

  return (
    <div id="page" className={style.code_editor}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <EditorMenu/>
        </div>
        <div className={style.run_tools_wrapper}>
          <RunTools/>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.file_manager_panel}>
          <ProjectTree/>
        </div>
        <div className={style.code_panel}>
          { content }
        </div>
      </div>
    </div>
  );
}