import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faTimes } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './FileTabs.scss';
import { cls } from '../../utils';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';

export interface IFileTabsProps {
  files: string[]
}

export default function FileTabs(props: IFileTabsProps) {
  const state = useSelector((state: IStoreState) => state.dslFile);
  const [items, setItems] = useState([] as { id: number, name: string }[]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (state.fileType === 'file') {
      if (items.some(v => v.id === state.id)) return;
      setItems(items => items.concat({ id: state.id, name: state.filename }));
      setActiveIndex(items.length);
    }
  }, [state.id]);

  const content = items.map((v, i) => {
    const handleClose = () => {
      setItems(items => items.filter(item => item.id !== v.id));
    };
    const handleClick = () => {
      setActiveIndex(i);
    };
    return (
      <FileTabItem key={i} filename={v.name} onClose={handleClose} active={activeIndex === i} onClick={handleClick}/>
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