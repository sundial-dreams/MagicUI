import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faGavel, faPlay, faSearch, faSave, faFileCode } from '@fortawesome/free-solid-svg-icons';
import Bridge from '../../../public/utils/bridge';
import { WidgetType } from '../../../public/utils/constants';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { saveAllDslCode, saveDslCode } from '../../utils/api';
import toast from '../../components/toast';
// @ts-ignore
import style from './RunTimeTools.scss';

export default function RunTimeTools() {
  const openFileItems = useSelector((state: IStoreState) => state.openFileItems);
  const files = useSelector((state: IStoreState) => state.dslFileArray)
  const user = useSelector((state: IStoreState) => state.user);

  const handleRun = () => {
    Bridge.compile('json', openFileItems.items[openFileItems.currentIndex].code).then(v => {
      Bridge.open(WidgetType.WEBGL, v);
    })
  };

  const handleSave = () => {
    const cur = openFileItems.items[openFileItems.currentIndex];
    saveDslCode(cur.id, user.email, cur.code, cur.fileId).then((v) => {
      if (!v.err) {
        toast('save code!');
      }
    })
  };

  const handleSaveAll = () => {
    saveAllDslCode(user.email, files.files).then((v) => {
      if (!v.err) {
        toast('save all!');
      }
    });
  };

  const handleBuild = () => {
    Bridge.open(WidgetType.CODE, {
      type: 'target',
      data: openFileItems.items[openFileItems.currentIndex].code
    });
  };

  return (
    <div className={style.run_tools}>
      <button className={style.build_btn} onClick={handleBuild}>
        <FontAwesomeIcon icon={faGavel}/>
      </button>
      <button className={style.run_btn} onClick={handleRun}>
        <FontAwesomeIcon icon={faPlay}/>
      </button>
      <button className={style.save_btn} onClick={handleSave}>
        <FontAwesomeIcon icon={faFileCode}/>
      </button>
      <button className={style.save_all_btn} onClick={handleSaveAll}>
        <FontAwesomeIcon icon={faSave}/>
      </button>
      <div className={style.search}>
        <input/>
        <FontAwesomeIcon icon={faSearch}/>
      </div>
    </div>
  );
}
