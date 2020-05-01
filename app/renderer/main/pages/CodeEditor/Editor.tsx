import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';



// @ts-ignore
import style from './Editor.scss';
import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';

export interface IDSLCodeEditorProps {

}

export default function DSLCodeEditor(props: IDSLCodeEditorProps) {
  const [value, setValue] = useState('');

  const handleChange = (editor: any, data: any, value: any) => {
    setValue(value);
  };

  const options = {
    mode: 'javascript',
    theme: 'material',
    lineNumbers: true
  };

  return (
    <div className={style.dsl_code_editor}>
      <div className={style.code_mirror_wrapper}>
        <CodeMirror onBeforeChange={handleChange} options={options} value={value}/>
      </div>
      <div className={style.editor_status_bar}>

      </div>
    </div>
  );
}