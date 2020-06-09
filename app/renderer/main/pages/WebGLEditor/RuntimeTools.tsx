import { ipcRenderer } from 'electron';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleNotch, faGavel, faFileExport, faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';
import modal from '../../components/modal';
import { buildCode, exportCode } from '../../actions/webglEditor';

// @ts-ignore
import style from './RuntimeTools.scss';
import { IStoreState } from '../../store';

export default function RuntimeTools(props: {}) {
  const {loading} = useSelector((state: IStoreState) => state.autoSaveLoading);
  console.log('loading', loading);
  const loadingIcon = (
    <FontAwesomeIcon icon={faCircleNotch} spin color={'gray'}/>
  );
  const checkIcon = (
    <FontAwesomeIcon icon={faCheck} color={'red'}/>
  );
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
          { loading ? loadingIcon : checkIcon }
        </button>
      </div>
    </div>
  );
}