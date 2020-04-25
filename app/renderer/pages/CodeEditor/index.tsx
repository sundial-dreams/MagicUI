import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import '../../../../resources/style/codemirror.global.css';
import '../../../../resources/style/material.global.css';

// @ts-ignore
import style from './index.css';
import DSLCodeEditor from './Editor';
import {EditorMenu} from './EditorMenu';
import ProjectTree from './ProjectTree';

export interface ICodeEditor {

}

export default function CodeEditor(props: ICodeEditor) {
  return (
    <div id="page" className={style.code_editor}>
      <div className={style.header_navigation}>
        <EditorMenu/>
      </div>
      <div className={style.content}>
        <div className={style.file_manager_panel}>
          <ProjectTree/>
        </div>
        <div className={style.code_panel}>
          <div className={style.file_tab}>

          </div>
          <div className={style.editor_wrapper}>
            <DSLCodeEditor/>
          </div>
        </div>
      </div>
    </div>
  );
}