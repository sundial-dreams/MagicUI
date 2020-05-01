import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faFolderMinus, faFile, faFileImport, faTrash } from '@fortawesome/free-solid-svg-icons';
import { File, Folder } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import {IDSLFileState} from '../../store/DSLEditor';
import { selectFile } from '../../actions/DSLEditor';
// @ts-ignore
import style from './ProjectTree.scss';

export default function ProjectTree() {

  return (
    <div className={style.project_tree}>
      <div className={style.project_title}>
        <span>Auto UI</span>
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
  return (
    <div className={style.project_manage_tools}>
      <button className={style.mk_file_btn}>
        <FontAwesomeIcon icon={faFileImport}/>
      </button>
      <button className={style.mk_dir_btn}>
        <FontAwesomeIcon icon={faFolderPlus}/>
      </button>
      <button className={style.delete_btn}>
        <FontAwesomeIcon icon={faTrash}/>
      </button>
    </div>
  );
}

const files = [
  {
    type: 'folder',
    name: 'main',
    id: 0,
    files: [
      {
        type: 'folder',
        name: 'app',
        id: 1,
        files: [
          {
            type: 'folder',
            name: 'renderer',
            id: 2,
            files: [
              { type: 'file', name: 'cc.dsl', id: 4 },
              { type: 'file', name: 'dd.dsl', id: 5 }
            ]
          },
          { type: 'file', name: 'e.dsl', id: 6 }
        ]
      },
      { type: 'file', name: 'a.dsl', id: 7 },
      { type: 'file', name: 'b.dsl', id: 8 }
    ]
  },
  { type: 'file', name: 'test.dsl', id: 9 }
];

type FilesType = {
  type: string;
  name: string;
  id: number;
  files?: FilesType[]
};

const make = (files: FilesType[], state: IDSLFileState, dispatch: Dispatch, indent = 1) => {
  console.log(state);
  return files.map((v, i) => {
    const active = v.id === state.id;
    const select = () => dispatch(selectFile(v.id, v.type, v.name));
    if (v.type === 'folder') {
      return (
        <Folder name={v.name} indent={indent} active={active} onClick={select}>
          {make(v.files as FilesType[], state, dispatch, indent + 1)}
        </Folder>
      );
    }
    return <File name={v.name} key={i} indent={indent} onClick={select} active={active}/>;
  });
};

function ProjectFileManager() {
  const state = useSelector((state: IStoreState) => state.dslFile);
  const dispatch = useDispatch();
  const content = make(files, state, dispatch);

  return (
    <div className={style.file_manager}>
      {content}
    </div>
  );
}
