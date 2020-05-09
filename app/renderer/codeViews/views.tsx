import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/jsx/jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCode, faFileExport } from '@fortawesome/free-solid-svg-icons';
import Electron, { ipcRenderer } from 'electron';
// @ts-ignore
import style from './views.scss';
import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';
import { jsonToDslCode, saveCodeFile } from './utils';
import Bridge from '../public/utils/bridge';
import { cls } from '../public/utils';

const cachedCode = ['', '', ''];
const tabItems = [
  ['DSL'],
  ['HTML', 'REACT']
];
const codeMode = [
  ['sass'],
  ['htmlmixed', 'jsx']
];

export interface IViewsProps {

}

export default function Views(props: IViewsProps) {
  const [code, setCode] = useState('');
  const [curStep, setCurStep] = useState(0);
  const [tabItem, setTabItem] = useState([] as string[]);
  const [curTabIndex, setCurTabIndex] = useState(0);
  const [tabItemArray, setTabItemArray] = useState(tabItems);
  const [codeModeArray, setCodeModeArray] = useState(codeMode);

  useEffect(() => {
    ipcRenderer.on('code', (event, args) => {
      if (args.type === 'json') {
        let dsl = jsonToDslCode(args.data);
        setCode(dsl);
        setTabItem(tabItems[0]);
        cachedCode[0] = dsl;
        return;
      }
      if (args.type === 'target') {
        setTabItemArray([tabItems[1]]);
        setTabItem(tabItems[1]);
        setCodeModeArray([codeMode[1]]);
        Bridge.compile('html', args.data).then((html) => {
          setCode(html);
          cachedCode[0] = html;
        });
        return;
      }
    });
  }, []);

  const handlePrevStep = () => {
    if (curStep <= 0) return;
    setCurStep(curStep => {
      setCode(cachedCode[curStep - 1]);
      setTabItem(tabItemArray[curStep - 1]);
      setCurTabIndex(0);
      return curStep - 1;
    });
  };

  const handleNextStep = () => {
    if (curStep >= tabItemArray.length - 1) return;

    setCurStep(curStep => {
      if (curStep === 0) {
        Bridge.compile('html', code).then((html) => {
          cachedCode[2] = html;
          setCode(html);
        });
      }

      setTabItem(tabItemArray[curStep + 1]);
      setCurTabIndex(0);
      return curStep + 1;
    });
  };

  const handleTabClick = (i: number) => setCurTabIndex(i);

  const handleCodeChange = (edit: any, data: any, value: any) => {
    setCode(value);
  };

  const handleExport = () => {
    saveCodeFile(tabItemArray[curStep][curTabIndex], code).then(() => {

    });
  };

  const prevBtn = curStep !== 0 && tabItemArray.length > 1 && (
    <button disabled={curStep === 0} onClick={handlePrevStep} className={style.prev_btn}>
      <span>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </span>
      Prev
    </button>
  );

  const nextBtn = (
    <button onClick={handleNextStep} className={style.next_btn}>
      Next
      <span>
        <FontAwesomeIcon icon={faArrowRight}/>
      </span>
    </button>
  );

  const exportBtn = (
    <button onClick={handleExport} className={style.export_btn}>
      Export
      <span>
        <FontAwesomeIcon icon={faFileExport}/>
      </span>
    </button>
  );

  return (
    <div className={style.views}>
      <Tab items={tabItem} onTabClick={handleTabClick} curIndex={curTabIndex}/>
      <CodeEditor code={code} onCodeChange={handleCodeChange} mode={codeMode[curStep][curTabIndex]}/>
      <div className={style.operator_btn}>
        {prevBtn}
        {curStep === tabItemArray.length - 1 ? exportBtn : nextBtn}
      </div>
    </div>
  );
}

interface ICodeEditorProps {
  code: string,
  onCodeChange: (edit: any, data: any, value: any) => void,
  mode: string
}

function CodeEditor(props: ICodeEditorProps) {

  const options = {
    mode: props.mode,
    theme: 'material',
    lineNumbers: true
  };

  return (
    <div className={style.code_editor}>
      <CodeMirror onBeforeChange={props.onCodeChange} value={props.code} options={options}/>
    </div>
  );
}

interface ITapProps {
  items: string[],
  curIndex: number,
  onTabClick: (index: number) => void
}

function Tab(props: ITapProps) {
  const content = props.items.map((v, i) => (
    <button key={i} onClick={() => props.onTabClick(i)} className={cls(props.curIndex === i && style.active)}>
      <FontAwesomeIcon icon={faCode}/>
      {'  ' + v}
    </button>
  ));


  return (
    <div className={style.tab}>
      {content}
    </div>
  );
}