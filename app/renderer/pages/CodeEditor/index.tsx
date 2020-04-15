import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';

// @ts-ignore
import style from './index.scss';
import DSLCodeEditor from './Editor';

export interface ICodeEditor {

}

export default function CodeEditor(props: ICodeEditor) {
  return (
    <div id="page" className={style.code_editor}>
      <div className={style.header_navigation}>

      </div>
      <div className={style.content}>
        <div className={style.file_manager_panel}>

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