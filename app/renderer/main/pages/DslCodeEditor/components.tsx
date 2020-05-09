import React, { Dispatch, ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCode, faFolderOpen, faFolder } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './components.scss';
import { cls } from '../../utils';
import { createDslFile } from '../../utils/api';
import toast from '../../components/toast';
import { appendFile } from '../../actions/dslEditor';

interface IFolderProps {
  name: string,
  children: ReactNode[] | ReactNode,
  onClick: () => void,
  indent?: number,
  active?: boolean
}

export function Folder(props: IFolderProps) {
  const [open, setOpen] = useState(false);
  const fileCount = Array.isArray(props.children) ? props.children.length : 1;

  const indent = props.indent || 1;
  const active = props.active || false;

  const handleFolderOpen = () => {
    setOpen(open => !open);
    props.onClick();
  };

  const btnStyle = {
    textIndent: indent * 10 + 'px'
  };

  return (
    <div className={style.folder}>
      <button className={cls(active && style.active)} onClick={handleFolderOpen} style={btnStyle}>
        <span>
          <FontAwesomeIcon icon={open ? faFolderOpen : faFolder}/>
        </span>
        {props.name}
      </button>
      <div className={cls(style.folder_files, !open && style.hidden)}>
        {props.children}
      </div>
    </div>
  );
}

interface IFileProps {
  name: string,
  onClick: () => void,
  indent?: number,
  active?: boolean,
}

export function File(props: IFileProps) {
  const indent = props.indent || 1;
  const active = props.active || false;

  const btnStyle = {
    textIndent: indent * 10 + 'px'
  };
  return (
    <button className={cls(style.file, active && style.active)} style={btnStyle} onClick={props.onClick}>
      <span>
      <FontAwesomeIcon icon={faFileCode}/>
      </span>
      {props.name}
    </button>
  );
}

export interface INewFileOrFolderModalProps {
  fileType: string,
  cancel: () => void,
  email: string,
  folder: string,
  dispatch: Dispatch<any>
}

export function NewFileOrFolderModal(props: INewFileOrFolderModalProps) {

  const [filename, setFilename] = useState('');
  const handleChange = (e: any) => {
    setFilename(e.target.value);
  };

  const handleCreate = () => {
    const { fileType, email, folder } = props;
    createDslFile(email, filename, fileType, folder).then(v => {
      if (!v.err) {
        props.dispatch(appendFile(v.id, filename, fileType, folder, ""));
        props.cancel();
        toast('new folder!');
      }
    });
  };

  return (
    <div className={style.new_file_or_folder_modal}>
      <div className={style.title}>
        {props.fileType === 'folder' ? 'Create Folder' : 'Create File'}
      </div>
      <div className={style.content}>
        <span>Name: </span><input type="text" placeholder="some..." value={filename} onChange={handleChange}/>
      </div>
      <div className={style.footer}>
        <button onClick={props.cancel}>CANCEL</button>
        <button onClick={handleCreate}>CREATE</button>
      </div>
    </div>
  );
}