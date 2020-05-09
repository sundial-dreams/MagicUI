import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faGavel, faPlay, faSearch, faSave, faFileCode } from '@fortawesome/free-solid-svg-icons';
import Bridge from '../../../public/utils/bridge';
import { WidgetName } from '../../../public/utils/constants';
// @ts-ignore
import style from './RunTools.scss';
import { useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { saveAllDslCode, saveDslCode } from '../../utils/api';
import toast from '../../components/toast';


export default function RunTools() {
  const dslCode = useSelector((state: IStoreState) => state.dslCode);
  const openFile = useSelector((state: IStoreState) => state.openFileItems);
  const files = useSelector((state: IStoreState) => state.dslFileArray)
  const user = useSelector((state: IStoreState) => state.user);
  const handleRun = () => {
    Bridge.compile('json', openFile.items[openFile.currentIndex].code).then(v => {
      Bridge.open(WidgetName.WEBGL_VIEWS, v);
    })
  };

  const handleSave = () => {
    saveDslCode(dslCode.id, user.email, "file", dslCode.code).then((v) => {
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
    Bridge.open(WidgetName.CODE_VIEWS, {
      type: 'target',
      data: openFile.items[openFile.currentIndex].code
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
