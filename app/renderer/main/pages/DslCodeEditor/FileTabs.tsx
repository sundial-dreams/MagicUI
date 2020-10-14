import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './FileTabs.scss';
import { cls } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { changeIndex, closeFile, selectedFileCode } from '../../actions/dslEditor';

export interface IFileTabsProps {
}

export default function FileTabs(props: IFileTabsProps) {
  const state = useSelector((state: IStoreState) => state.dslFile);
  const dispatch = useDispatch();
  const openFile = useSelector((state: IStoreState) => state.openFileItems);

  const content = openFile.items.map((v, i) => {
    const handleClick = () => {
      dispatch(changeIndex(i));
    };

    const handleClose = () => {
      dispatch(closeFile(i, "", ""));
    };


    return (
      <FileTabItem key={i} filename={v.name} onClose={handleClose} active={openFile.currentIndex === i} onClick={handleClick}/>
    );
  });
  return (
    <div className={style.file_tabs}>
      {content}
    </div>
  );
}


interface IFileTabItemProps {
  filename: string,
  active: boolean,
  onClose: () => void,
  onClick: () => void
}

function FileTabItem(props: IFileTabItemProps) {
  return (
    <div className={cls(style.file_tab_item, props.active && style.active)} onClick={props.onClick}>
      <span>{props.filename}</span>
      <button className={style.close_btn} onClick={props.onClose}>
        <FontAwesomeIcon icon={faTimes}/>
      </button>
    </div>
  );
}