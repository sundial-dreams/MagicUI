import React, { useEffect, useState } from 'react';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';

import DSLCodeEditor from './Editor';
import { EditorMenu } from './EditorMenu';
import FileSystem from './FileSystem';
import RunTimeTools from './RunTimeTools';
import FileTabs from './FileTabs';

// @ts-ignore
import style from './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import Empty from './Empty';
import { saveComponent } from '../../actions/webglEditor';
import { saveDslCode } from '../../utils/api';
import toast from '../../components/toast';
import modal from '../../components/modal';
import { NewFileOrFolderModal } from './components';
import Bridge from '../../../public/utils/bridge';
import { WidgetType } from '../../../public/utils/constants';

const cachedOpenFile = [];


export default function CodeEditor(props: {}) {
  const openFile = useSelector((state: IStoreState) => state.openFileItems);
  const user = useSelector((state: IStoreState) => state.user);
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const openFileItems = useSelector((state: IStoreState) => state.openFileItems);
  const dispatch = useDispatch();

  const content = openFile.items.length > 0 ? (<>
    <div className={style.file_tab_wrapper}>
      <FileTabs/>
    </div>
    <div className={style.editor_wrapper}>
      <DSLCodeEditor/>
    </div>
  </>) : (<Empty/>);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e);
      const isCmd = e.metaKey;
      if ((e.ctrlKey || isCmd) && e.key === 's') {
        const cur = openFileItems.items[openFileItems.currentIndex];
        saveDslCode(cur.id, user.email, cur.code, cur.fileId).then((v) => {
          if (!v.err) {
            toast('save code!');
          }
        })
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'n') {
        modal(cancel => (
          <NewFileOrFolderModal fileType="file" cancel={cancel} email={user.email} folder={dslFile.folder}
                                dispatch={dispatch}/>
        ));
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'b') {
        Bridge.open(WidgetType.CODE, {
          type: 'target',
          data: openFileItems.items[openFileItems.currentIndex].code
        });
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'r') {
        Bridge.compile('json', openFileItems.items[openFileItems.currentIndex].code).then(v => {
          Bridge.open(WidgetType.WEBGL, v);
        });
        return;
      }
    }
    window.addEventListener('keydown', handleKeyDown, false);
    return () => window.removeEventListener('keydown', handleKeyDown, false);
  }, [openFileItems.items, openFileItems.currentIndex, user.email, dslFile.folder])

  return (
    <div id="page" className={style.code_editor}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <EditorMenu/>
        </div>
        <div className={style.run_tools_wrapper}>
          <RunTimeTools/>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.file_manager_panel}>
          <FileSystem/>
        </div>
        <div className={style.code_panel}>
          { content }
        </div>
      </div>
    </div>
  );
}