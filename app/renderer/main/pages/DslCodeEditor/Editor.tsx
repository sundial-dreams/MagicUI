import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { localSaveFile, openFileLocalSave, selectedFileCode } from '../../actions/dslEditor';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sass/sass';

// @ts-ignore
import style from './Editor.scss';
import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';


export interface IDSLCodeEditorProps {

}

export default function DSLCodeEditor(props: IDSLCodeEditorProps) {
  const openFile = useSelector((state: IStoreState) => state.openFileItems);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(openFile.items[openFile.currentIndex].code)
  }, [openFile.items.length, openFile.currentIndex]);

  const handleChange = (editor: any, data: any, value: any) => {
    setValue(value);
    const index = openFile.currentIndex;
    const {id, fileId} = openFile.items[index];
    dispatch(localSaveFile(id, value));
    dispatch(openFileLocalSave(index, id, value, fileId))
  };

  const options = {
    mode: 'sass',
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