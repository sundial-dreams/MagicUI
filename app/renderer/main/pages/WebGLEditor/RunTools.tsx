import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheckSquare, faGavel, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { buildCode } from '../../actions/UIEditor';


// @ts-ignore
import style from './RunTools.scss';
import Bridge from '../../../public/utils/bridge';
import { WidgetName } from '../../../public/utils/constants';
import { createOnePage } from '../../utils/api';
import modal from '../../components/modal';

export interface IRunToolsProps {

}

export default function RunTools(props: IRunToolsProps) {
  const dispatch = useDispatch();
  const build = () => {
    dispatch(buildCode());
  };

  const run = async () => {
    modal(cancel => (
      <div onClick={cancel}>
        Cancel
      </div>
    ));
  };

  return (
    <div className={style.run_tools}>
      <div className={style.label}>
        RUN TOOLS:
      </div>
      <div className={style.tools}>
        <button className={style.build_btn} onClick={build}>
          <FontAwesomeIcon icon={faGavel}/>
        </button>
        <button className={style.run_btn} onClick={run}>
          <FontAwesomeIcon icon={faPlay}/>
        </button>
        <button className={style.export_btn}>
          <FontAwesomeIcon icon={faFileExport}/>
        </button>
        <button className={style.check_btn}>
          <FontAwesomeIcon icon={faCheckSquare}/>
        </button>
      </div>
    </div>
  );
}