import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu, {ItemSection, MenuItem} from '../../components/menu';
import { IStoreState } from '../../store';

// @ts-ignore
import style from './EditorMenu.scss';
import modal from '../../components/modal';
import { NewFileOrFolderModal } from './components';
import Confirm from '../../components/modal/confirm';
import { deleteDslFile, saveDslCode } from '../../utils/api';
import toast from '../../components/toast';
import { closeFile, localDeleteFile } from '../../actions/dslEditor';
import Bridge from '../../../public/utils/bridge';
import { WidgetType } from '../../../public/utils/constants';

export function EditorMenu() {
  const user = useSelector((state: IStoreState) => state.user);
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const openFileItems = useSelector((state: IStoreState) => state.openFileItems);
  const dispatch = useDispatch();

  const handleNewDslFile = () => {
    modal(cancel => (
      <NewFileOrFolderModal fileType="file" cancel={cancel} email={user.email} folder={dslFile.folder}
                            dispatch={dispatch}/>
    ));
  };
  const handleNewFolder = () => {
    modal(cancel => (
      <NewFileOrFolderModal fileType="folder" cancel={cancel} email={user.email} folder={dslFile.folder}
                            dispatch={dispatch}/>
    ));
  };
  const handleDeleteDslFile = () => {
    modal(cancel => <Confirm title={`Do you want to delete ${dslFile.filename}`} cancel={cancel} confirm={() => {
      deleteDslFile(user.email, dslFile.id, dslFile.fileId).then(v => {
        if (!v.err) {
          toast('delete file!');
          dispatch(localDeleteFile(dslFile.id));
          let i = 0, check = false;
          for (let item of openFileItems.items) {
            if (v.id === item.id) {
              check = true;
              break
            }
            i++;
          }
          console.log(check, i - 1);
          check && dispatch(closeFile(i - 1, dslFile.id, dslFile.fileId));
          cancel();
        }
      });
    }}/>);
  };
  const handleSaveDslCode = () => {
    const cur = openFileItems.items[openFileItems.currentIndex];
    saveDslCode(cur.id, user.email, cur.code, cur.fileId).then((v) => {
      if (!v.err) {
        toast('save code!');
      }
    })
  };
  const handleBuild = () => {
    Bridge.open(WidgetType.CODE, {
      type: 'target',
      data: openFileItems.items[openFileItems.currentIndex].code
    });
  };
  const handleRun = () => {
    Bridge.compile('json', openFileItems.items[openFileItems.currentIndex].code).then(v => {
      Bridge.open(WidgetType.WEBGL, v);
    })
  };

  return (
    <Menu>
      <MenuItem name="File">
        <ItemSection text="New File" onClick={handleNewDslFile}/>
        <ItemSection text="New Folder" onClick={handleNewFolder}/>
        <ItemSection text="Delete" onClick={handleDeleteDslFile}/>
      </MenuItem>
      <MenuItem name="Edit">
        <ItemSection text="Save" onClick={handleSaveDslCode}/>
        <ItemSection text="Save All"/>
      </MenuItem>
      <MenuItem name="Run">
        <ItemSection text="Build" onClick={handleBuild}/>
        <ItemSection text="Run" onClick={handleRun}/>
      </MenuItem>
      <MenuItem name="Help">
        <ItemSection text="DSL help"/>
        <ItemSection text="Question"/>
      </MenuItem>
    </Menu>
  )
}