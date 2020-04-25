import React, {useState} from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import '../../../../resources/style/codemirror.global.css';
import '../../../../resources/style/material.global.css';

// @ts-ignore
import style from './Editor.css';

export interface IDSLCodeEditorProps {

}

export default function DSLCodeEditor(props: IDSLCodeEditorProps) {

  const [value, setValue] = useState('');

  const handleChange = (editor: any, data: any, value: any) => {
    setValue(value);
  };

  return (
    <div className={style.dsl_code_editor}>
      <div className={style.code_mirror_wrapper}>
        <CodeMirror
          onBeforeChange={handleChange}
          options={{
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true
          }}
          value={value}
        />
      </div>
      <div className={style.editor_status_bar}>

      </div>
    </div>
  );
}