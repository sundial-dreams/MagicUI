import React, {ReactNode, useState} from 'react';
import {drag} from '../../webgl/drag';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faCaretDown, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {cls} from '../../utils';

// @ts-ignore
import style from './components.scss';
import { createOnePage } from '../../utils/api';
import toast from '../../components/toast';

export interface IUIComponentsItemProps {
  icon: IconProp
  name: string
}

export function UIComponentItem(props: IUIComponentsItemProps) {

  return (
    <button className={style.ui_component_item} draggable onDragStart={drag.bind(null, props.name)}>
      <FontAwesomeIcon icon={props.icon}/>
      <div className={style.name}>{props.name}</div>
    </button>
  );
}

export interface IUIComponentsFoldProps {
  children: ReactNode[] | ReactNode,
  title: string,
  onToggle?: Function,
}

export function UIComponentsFold(props: IUIComponentsFoldProps) {
  const [unfold, setUnfold] = useState(true);
  const handleUnfold = () => {
    setUnfold(unfold => !unfold);
  };

  const length = !props.children ? 0 : Array.isArray(props.children) ? props.children.length + 1 : 1;

  const foldStyle = {
    height: (unfold ? length * 28 + 10 : 28) + 'px'
  };
  return (
    <div className={style.ui_components_fold} style={foldStyle}>
      <button className={cls(style.fold_btn, !unfold && style.fold)} onClick={handleUnfold}>
        <span>
          <FontAwesomeIcon icon={faCaretDown}/>
        </span>
        {props.title}
      </button>
      <div className={style.fold_content}>
        {props.children}
      </div>
    </div>
  );
}



interface INewPageModalProps {
  cancel: () => void;
  email: string
}

export function NewPageModal(props: INewPageModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleCreateNewPage = () => {
    setCreating(true);
    createOnePage(props.email, name, description).then(() => {
      setCreating(false);
      props.cancel();
      toast('create new page!');
    }).catch(() => {
      props.cancel();
      toast('create page fail!');
    });
  };
  return (
    <div className={style.new_page_modal}>
      <div className={style.header}>
        Create Page
      </div>
      <div className={style.content}>
        <div className={style.input}>
          <div>Name</div>
          <input type='text' value={name} onChange={handleNameChange}/>
        </div>
        <div className={cls(style.input, style.textarea)}>
          <div>Description</div>
          <textarea value={description} onChange={handleDescriptionChange}/>
        </div>
      </div>
      <div className={style.foot}>
        <button onClick={props.cancel}>CANCEL</button>
        <button onClick={handleCreateNewPage}>
          {creating ? <FontAwesomeIcon icon={faSpinner} spin/> : 'CREATE'}
        </button>
      </div>
    </div>
  );
}