import React, { useCallback, useEffect, useRef } from 'react';
import * as Three from 'three';
import { useHistory } from 'react-router';
import ComponentsPanel from './ComponentsPanel';

import Editor from './Editor';
import PropertiesPanel from './PropertiesPanel';
import Menu, { ItemSection, MenuItem } from '../../components/menu';
import EditTools from './EditTools';
import RuntimeTools from './RuntimeTools';

import modal from '../../components/modal';
import { NewPageModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { deleteOnePage, fetchAllPages, fetchOnePage } from '../../utils/api';
import {
  buildCode,
  copyComponent,
  deleteComponent, exportCode,
  pasteComponent, saveComponent,
  selectWebGLPage,
  undoComponent
} from '../../actions/webglEditor';
import toast from '../../components/toast';
import Confirm from '../../components/modal/confirm';

// @ts-ignore
import style from './index.scss';


export default function UIEditor(props: {}) {
  const user = useSelector((state: IStoreState) => state.user);
  const webglPage = useSelector((state: IStoreState) => state.webGLPage);
  const cpnState = useSelector((state: IStoreState) => state.component);
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.email) return;
    fetchAllPages(user.email).then(v => {
      if (v.err) {
        toast('error!');
        return;
      }
      const [onePage] = v.pages;
      fetchOnePage(user.email, onePage.pageId).then(v => {
        if (!v.err) {
          dispatch(selectWebGLPage(
            onePage.pageId,
            onePage.name || 'name',
            v.page.page,
            onePage.id
          ));
        }
      });
    }).catch(err => {

    });
  }, [user.email]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey;
      if ((e.ctrlKey || isCmd) && e.key === 's') {
        dispatch(saveComponent());
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'c') {
        dispatch(copyComponent(cpnState.id));
        toast('copy!');
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'v') {
        dispatch(pasteComponent(editToolsState.id));
        toast('paste!');
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'd') {
        dispatch(deleteComponent(cpnState.id));
        toast('delete!');
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'u') {
        dispatch(undoComponent(cpnState.id));
        toast('undo!');
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'b') {
        dispatch(buildCode());
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'e') {
        dispatch(exportCode());
        return;
      }
      if ((e.ctrlKey || isCmd) && e.key === 'n') {
        modal(cancel => <NewPageModal cancel={cancel} email={user.email} dispatch={dispatch}/>);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown, false);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [cpnState.id, editToolsState.id]);

  return (
    <div id='page' className={style.ui_editor}>
      <div className={style.header_navigation}>
        <div className={style.menu_wrapper}>
          <EditorMenu/>
        </div>
        <div className={style.run_tools_wrapper}>
          <RuntimeTools/>
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
  const webglPage = useSelector((state: IStoreState) => state.webGLPage);
  const cpnState = useSelector((state: IStoreState) => state.component);
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const dispatch = useDispatch();
  const openNewPageModal = () => {
    modal(cancel => <NewPageModal cancel={cancel} email={user.email} dispatch={dispatch}/>);
  };

  const openDeletePageModal = () => {
    modal(cancel => <Confirm title={`do you want to delete ${webglPage.name}?`} cancel={cancel} confirm={() => {
      deleteOnePage(user.email, webglPage.id).then((v) => {
        if (!v.err) {
          fetchOnePage(user.email, v.pageId).then((res) => {
            cancel();
            toast('delete one page!');
            dispatch(selectWebGLPage(
              v.pageId,
              v.name,
              res.page.page,
              v.id
            ));
          });
        }
      });
    }}/>);
  };

  const handleUndo = () => {
    dispatch(undoComponent(cpnState.id));
    toast('undo!');
  };

  const handleCopy = () => {
    dispatch(copyComponent(cpnState.id));
    toast('copy!');
  };
  const handleCut = () => {
    dispatch(copyComponent(cpnState.id));
    dispatch(deleteComponent(cpnState.id));
    toast('cut!');
  };
  const handlePaste = () => {
    dispatch(pasteComponent(editToolsState.id));
    toast('paste!');
  };
  const handleSave = () => {
    dispatch(saveComponent());
  };
  const handleDelete = () => {
    dispatch(deleteComponent(cpnState.id));
    toast('delete!');
  };

  const handleBuild = () => {
    dispatch(buildCode());

  };
  const handleRun = () => {};
  const handleExport = () => {
    dispatch(exportCode());
  };

  return (
    <Menu>
      <MenuItem name="Pages">
        <ItemSection text="New" onClick={openNewPageModal}/>
        <ItemSection text="Delete" onClick={openDeletePageModal}/>
      </MenuItem>
      <MenuItem name="Edit">
        <ItemSection text="undo" onClick={handleUndo}/>
        <ItemSection text="Copy" onClick={handleCopy}/>
        <ItemSection text="Cut" onClick={handleCut}/>
        <ItemSection text="Paste" onClick={handlePaste}/>
        <ItemSection text="Save" onClick={handleSave}/>
        <ItemSection text="Delete" onClick={handleDelete}/>
      </MenuItem>
      <MenuItem name="Run">
        <ItemSection text="Build" onClick={handleBuild}/>
        <ItemSection text="Run Dev" onClick={handleRun}/>
        <ItemSection text="Export" onClick={handleExport}/>
      </MenuItem>
    </Menu>
  );
}