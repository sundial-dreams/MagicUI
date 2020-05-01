import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faGavel, faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import Bridge from '../../../public/utils/bridge';
import { WidgetName } from '../../../public/utils/constants';
// @ts-ignore
import style from './RunTools.scss';


export default function RunTools() {
  const handleBuild = () => {
    Bridge.open(WidgetName.WEBGL_VIEWS);
  };
  return (
    <div className={style.run_tools}>
      <button className={style.build_btn} onClick={handleBuild}>
        <FontAwesomeIcon icon={faGavel}/>
      </button>
      <button className={style.run_btn}>
        <FontAwesomeIcon icon={faPlay}/>
      </button>
      <button className={style.export_btn}>
        <FontAwesomeIcon icon={faFileExport}/>
      </button>
      <div className={style.search}>
        <input/>
        <FontAwesomeIcon icon={faSearch}/>
      </div>
    </div>
  );
}
