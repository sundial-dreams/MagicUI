import { ipcRenderer } from 'electron';
import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheckSquare, faGavel, faFileExport } from '@fortawesome/free-solid-svg-icons';
import modal from '../../components/modal';
import { buildCode, exportCode } from '../../actions/webglEditor';

// @ts-ignore
import style from './RuntimeTools.scss';

export default function RuntimeTools(props: {}) {
  const dispatch = useDispatch();
  const build = () => {
    dispatch(buildCode());
  };

  const run = () => {
    modal(cancel => (
      <div onClick={cancel}>
        Cancel
      </div>
    ));
  };

  const handleExport = () => {
    dispatch(exportCode());
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
        <button className={style.export_btn} onClick={handleExport}>
          <FontAwesomeIcon icon={faFileExport}/>
        </button>
        <button className={style.check_btn}>
          <FontAwesomeIcon icon={faCheckSquare}/>
        </button>
      </div>
    </div>
  );
}