import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCopy, faUndo, faSave, faCut, faPaste, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import {IStoreState} from '../../store';
import {
  copyComponent,
  deleteComponent,
  pasteComponent,
  saveComponent,
  undoComponent
} from '../../actions/webglEditor';

// @ts-ignore
import style from './EditTools.scss';
import toast from '../../components/toast';
import { savePage } from '../../utils/api';
export interface IEditToolsProps {

}

export default function EditTools(props: IEditToolsProps) {
  const cpnState = useSelector((state: IStoreState) => state.component);
  const editToolsState = useSelector((state: IStoreState) => state.editTools);
  const webGLPage = useSelector((state: IStoreState) => state.webGLPage);
  const dispatch = useDispatch();

  const undo = () => {
    dispatch(undoComponent(cpnState.id));
    toast('undo!');
  };

  const del = () => {
    dispatch(deleteComponent(cpnState.id));
    toast('delete!');
  };

  const paste = () => {
    dispatch(pasteComponent(editToolsState.id))
    toast('paste!');
  };

  const copy = () => {
    dispatch(copyComponent(cpnState.id));
    toast('copy!');
  };

  const cut = () => {
    dispatch(copyComponent(cpnState.id));
    dispatch(deleteComponent(cpnState.id));
    toast('cut!');
  };

  const save = () => {
    dispatch(saveComponent())
  };

  return (
    <div className={style.edit_tools}>
      <div className={style.label}>
        EDIT:
      </div>
      <div className={style.tools}>
          <button className={style.save_btn}>
            <FontAwesomeIcon icon={faSave} onClick={save}/>
          </button>
          <button className={style.undo_btn} onClick={undo}>
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