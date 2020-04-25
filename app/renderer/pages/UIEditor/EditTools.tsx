import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy, faUndo, faSave, faCut, faPaste, faTrash} from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './EditTools.css';
import {useDispatch, useSelector} from 'react-redux';
import {IStoreState} from '../../store';
import {copyComponent, deleteComponent, pasteComponent} from '../../actions';

export interface IEditToolsProps {

}

export default function EditTools(props: IEditToolsProps) {
  const curCpnState = useSelector((state: IStoreState) => state.currentComponent);
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const dispatch = useDispatch();
  const del = () => {
    dispatch(deleteComponent(curCpnState.id));
  };

  const paste = () => {
    dispatch(pasteComponent(editToolsState.id))
  };

  const copy = () => {
    dispatch(copyComponent(curCpnState.id));
  };

  const cut = () => {
    dispatch(copyComponent(curCpnState.id));
    dispatch(deleteComponent(curCpnState.id));
  };

  return (
    <div className={style.edit_tools}>
      <div className={style.label}>
        EDIT:
      </div>
      <div className={style.tools}>
          <button className={style.save_btn}>
            <FontAwesomeIcon icon={faSave}/>
          </button>
          <button className={style.undo_btn}>
            <FontAwesomeIcon icon={faUndo}/>
          </button>
          <button className={style.cut_btn} onClick={cut}>
            <FontAwesomeIcon icon={faCut}/>
          </button>
          <button className={style.copy_btn} onClick={copy}>
            <FontAwesomeIcon icon={faCopy}/>
          </button>
          <button className={style.paste_btn} onClick={paste}>
            <FontAwesomeIcon icon={faPaste}/>
          </button>
          <button className={style.trash_btn} onClick={del}>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
      </div>
    </div>
  );
}