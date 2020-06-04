import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderPlus,
  faFolderMinus,
  faFile,
  faFileImport,
  faTrash,
  faUserCheck, faPlus
} from '@fortawesome/free-solid-svg-icons';
import { File, Folder, NewFileOrFolderModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState, IUserState } from '../../store';
import { IDSLFileState } from '../../store/dslEditor';
import {
  addFile,
  appendFile, closeFile,
  fetchFiles,
  localDeleteFile,
  selectedFileCode,
  selectFile
} from '../../actions/dslEditor';
// @ts-ignore
import style from './FileSystem.scss';
import { deleteDslFile, fetchDslCode, fetchDslFiles } from '../../utils/api';
import modal from '../../components/modal';
import Confirm from '../../components/modal/confirm';
import toast from '../../components/toast';

export default function FileSystem() {
  const user = useSelector((state: IStoreState) => state.user);
  return (
    <div className={style.project_tree}>
      <div className={style.project_title}>
        <span>
          <FontAwesomeIcon icon={faUserCheck}/>
          &nbsp;&nbsp;
          {user.email}
        </span>
      </div>
      <div className={style.project_content}>
        <FileManager/>
      </div>
      <div className={style.project_footer}>
        <ProjectManageTools/>
      </div>
    </div>
  );
}


function ProjectManageTools() {
  const user = useSelector((state: IStoreState) => state.user);
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const openFileItems = useSelector((state: IStoreState) => state.openFileItems);
  const dispatch = useDispatch();
  const handleCreateFile = () => {
    modal(cancel => (
      <NewFileOrFolderModal fileType="file" cancel={cancel} email={user.email} folder={dslFile.folder}
                            dispatch={dispatch}/>
    ));
  };
  const handleCreateFolder = () => {
    modal(cancel => (
      <NewFileOrFolderModal fileType="folder" cancel={cancel} email={user.email} folder={dslFile.folder}
                            dispatch={dispatch}/>
    ));
  };

  const handleDeleteFile = () => {
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

  return (
    <div className={style.project_manage_tools}>
      <button className={style.mk_file_btn} onClick={handleCreateFile}>
        <FontAwesomeIcon icon={faPlus}/>
      </button>
      <button className={style.mk_dir_btn} onClick={handleCreateFolder}>
        <FontAwesomeIcon icon={faFolderPlus}/>
      </button>
      <button className={style.delete_btn} onClick={handleDeleteFile}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}

function toFileJson(arr: any[]) {
  let map = new Map();
  let fileMap = new Map<string, any[]>();
  let folderMap = new Map<string, any[]>();
  for (let v of arr) {
    map.set(v.id, v.fileType === 'folder' ? { ...v, files: [] } : v);
    if (v.fileType === 'file' && v.folder !== '' && v.folder !== '""') {
      if (fileMap.has(v.folder)) {
        fileMap.get(v.folder)?.push(v);
      } else {
        fileMap.set(v.folder, [v]);
      }
    }
    if (v.type === 'folder' && (v.folder !== '' && v.folder !== '""')) {
      if (folderMap.has(v.folder)) {
        folderMap.get(v.folder)?.push(v);
      } else {
        folderMap.set(v.folder, [v]);
      }
    }
  }

  for (let [k, v] of fileMap) {
    const folder = map.get(k);
    folder.files.push(...v);
  }

  for (let [k, v] of folderMap) {
    let parentFolder = map.get(k);
    for (let t of v) {
      let childFolder = map.get(t.id);
      parentFolder?.files?.push(childFolder);
    }
  }

  let result = [];
  for (let [k, v] of map) {
    if (v.folder === '' || v.folder === '""') result.push(v);
  }
  console.log(result);
  return result;
}


type FilesType = {
  fileType: string;
  filename: string;
  id: string;
  folder: string;
  files?: FilesType[],
  fileId: string
};

const make = (files: FilesType[], userState: IUserState, fileState: IDSLFileState, dispatch: Dispatch, indent = 1) => {
  return files.map((v, i) => {
    const active = v.id === fileState.id;
    if (v.fileType === 'folder') {
      const select = () => {
        dispatch(selectFile(v.id, v.fileType, v.filename, v.id, '', v.fileId));
      };
      return (
        <Folder name={v.filename} indent={indent} active={active} onClick={select}>
          {make(v.files as FilesType[], userState, fileState, dispatch, indent + 1)}
        </Folder>
      );
    }
    const select = () => {
      fetchDslCode(userState.email, v.fileId).then(res => {
        dispatch(selectFile(v.id, v.fileType, v.filename, v.folder, res.dsl.code, v.fileId));
        dispatch(addFile(v.id, v.filename, res.dsl.code, v.fileId));
      });
    };
    return <File name={v.filename} key={i} indent={indent} onClick={select} active={active}/>;
  });
};

function FileManager() {
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const dslFileArray = useSelector((state: IStoreState) => state.dslFileArray);
  const user = useSelector((state: IStoreState) => state.user);
  const dispatch = useDispatch();

  const content = dslFileArray.files.length > 0 && make(toFileJson(dslFileArray.files), user, dslFile, dispatch);

  useEffect(() => {
    fetchDslFiles(user.email).then((v) => {
      if (!v.err) {
        const folders = v.folders as { id: string, own: string, name: string, folder: string, createTime: number }[];
        const files = v.files as { id: string, own: string, name: string, folder: string, createTime: number, fileId: string }[];
        const arr = [];
        for (let v of folders) {
          arr.push({ ...v, filename: v.name, fileType: 'folder', fileId: v.id });
        }
        for (let v of files) {
          arr.push({ ...v, filename: v.name, fileType: 'file' });
        }
        dispatch(fetchFiles(arr));
      }
    });
  }, [user.email]);

  return (
    <div className={style.file_manager}>
      {content}
    </div>
  );
}
