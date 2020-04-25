import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faCloudUploadAlt, faCheckSquare, faGavel} from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import style from './RunTools.css';

export interface IRunToolsProps {

}

export default function RunTools(props: IRunToolsProps) {
  return (
    <div className={style.run_tools}>
      <div className={style.label}>
        RUN TOOLS:
      </div>
      <div className={style.tools}>
        <button className={style.build_btn}>
          <FontAwesomeIcon icon={faGavel}/>
        </button>
        <button className={style.run_btn}>
          <FontAwesomeIcon icon={faPlay}/>
        </button>
        <button className={style.export_btn}>
          <FontAwesomeIcon icon={faCloudUploadAlt}/>
        </button>
        <button className={style.check_btn}>
          <FontAwesomeIcon icon={faCheckSquare}/>
        </button>
      </div>
    </div>
  );
}