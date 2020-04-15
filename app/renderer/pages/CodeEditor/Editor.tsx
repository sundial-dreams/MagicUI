import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';

import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';

// @ts-ignore
import style from './Editor.scss';

export interface IDSLCodeEditorProps {

}

export default function DSLCodeEditor(props: IDSLCodeEditorProps) {

  const [value, setValue] = useState('');

  const handleChange = (editor: any, data: any, value: any) => {
    setValue(value);
  };

  return (
    <div className={style.dsl_code_editor}>
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
  )
}