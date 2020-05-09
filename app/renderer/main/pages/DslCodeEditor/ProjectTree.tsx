import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderPlus,
  faFolderMinus,
  faFile,
  faFileImport,
  faTrash,
  faUserCheck
} from '@fortawesome/free-solid-svg-icons';
import { File, Folder, NewFileOrFolderModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { IDSLFileState } from '../../store/dslEditor';
import { addFile, appendFile, fetchFiles, selectedFileCode, selectFile } from '../../actions/dslEditor';
// @ts-ignore
import style from './ProjectTree.scss';
import { fetchDslFiles } from '../../utils/api';
import modal from '../../components/modal';

export default function ProjectTree() {
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
        <ProjectFileManager/>
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
  const dispatch = useDispatch();
  const handleDelete = () => {

  };
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

  return (
    <div className={style.project_manage_tools}>
      <button className={style.mk_file_btn} onClick={handleCreateFile}>
        <FontAwesomeIcon icon={faFileImport}/>
      </button>
      <button className={style.mk_dir_btn} onClick={handleCreateFolder}>
        <FontAwesomeIcon icon={faFolderPlus}/>
      </button>
      <button className={style.delete_btn}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}

const arr = [
  { id: '1', type: 'folder', name: 'sss', folder: '' },
  { id: '2', type: 'folder', name: 'abc', folder: '1' },
  { id: '3', type: 'folder', name: '222', folder: '1' },
  { id: '4', type: 'file', name: 'sss.dsl', code: 'sss', folder: '2' },
  { id: '5', type: 'file', name: 'bss.dsl', code: 'sss', folder: '2' },
  { id: '6', type: 'file', name: 'Sas.dsl', code: 'sss', folder: '3' }
];

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
  return result;
}


type FilesType = {
  fileType: string;
  filename: string;
  id: string;
  code: string;
  folder: string;
  files?: FilesType[]
};

const make = (files: FilesType[], state: IDSLFileState, dispatch: Dispatch, indent = 1) => {
  return files.map((v, i) => {
    const active = v.id === state.id;
    if (v.fileType === 'folder') {
      const select = () => {
        dispatch(selectFile(v.id, v.fileType, v.filename, v.id, ''));
      };
      return (
        <Folder name={v.filename} indent={indent} active={active} onClick={select}>
          {make(v.files as FilesType[], state, dispatch, indent + 1)}
        </Folder>
      );
    }
    const select = () => {
      dispatch(selectFile(v.id, v.fileType, v.filename, v.folder, v.code));
      dispatch(addFile(v.id, v.filename, v.code));
    };
    return <File name={v.filename} key={i} indent={indent} onClick={select} active={active}/>;
  });
};

function ProjectFileManager() {
  const dslFile = useSelector((state: IStoreState) => state.dslFile);
  const dslFileArray = useSelector((state: IStoreState) => state.dslFileArray);
  const user = useSelector((state: IStoreState) => state.user);
  const dispatch = useDispatch();

  const content = dslFileArray.files.length > 0 && make(toFileJson(dslFileArray.files), dslFile, dispatch);
  useEffect(() => {
    console.log('to json file', toFileJson(arr));
    fetchDslFiles(user.email).then((v) => {
      console.log('files ', v);
      if (!v.err) {
        dispatch(fetchFiles(v.files));
      }
    });
  }, [user.email]);

  return (
    <div className={style.file_manager}>
      {content}
    </div>
  );
}
