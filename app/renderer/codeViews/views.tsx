import React, { useEffect, useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/sass/sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCode } from '@fortawesome/free-solid-svg-icons';
import Electron, { ipcRenderer } from 'electron';
// @ts-ignore
import style from './views.scss';
import '~resources/style/codemirror.global.scss';
import '~resources/style/material.global.scss';
import { generateDSLCode } from './utils';

const cachedCode = ['', '', ''];
const tabItems = [
  ['JSON'],
  ['DSL'],
  ['HTML', 'REACT', 'QML']
];

export interface IViewsProps {

}

export default function Views(props: IViewsProps) {
  const [code, setCode] = useState('');
  const [curStep, setCurStep] = useState(0);
  const [tabItem, setTabItem] = useState([] as string[]);
  const [curTabIndex, setCurTabIndex] = useState(0);

  useEffect(() => {
    ipcRenderer.on('jsonCode', (event, args) => {
      let json = JSON.stringify(args, null, 2);
      setCode(json);
      setTabItem(tabItems[0]);
      cachedCode[0] = json;
    });
  }, []);

  const handlePrevStep = () => {
    if (curStep <= 0) return;
    setCurStep(curStep => {
      setCode(cachedCode[curStep - 1]);
      setTabItem(tabItems[curStep - 1]);
      setCurTabIndex(0);
      return curStep - 1;
    });
  };

  const handleNextStep = () => {
    if (curStep >= 2) return;

    setCurStep(curStep => {
      if (curStep === 0) {
        let dsl = generateDSLCode(JSON.parse(code));
        cachedCode[1] = dsl;
        setCode(dsl);
      }

      setTabItem(tabItems[curStep + 1]);
      setCurTabIndex(0);
      return curStep + 1;
    });
  };

  const handleTabClick = (i: number) => setCurTabIndex(i);

  const handleCodeChange = (edit: any, data: any, value: any) => {
    setCode(value);
  };

  const prevBtn = curStep !== 0 && (
    <button disabled={curStep === 0} onClick={handlePrevStep}>
      <FontAwesomeIcon icon={faArrowLeft}/>
      Prev
    </button>
  );

  const nextBtn = curStep !== 2 && (
    <button onClick={handleNextStep} disabled={curStep === 2}>
      Next
      <FontAwesomeIcon icon={faArrowRight}/>
    </button>
  );

  return (
    <div className={style.views}>
      <Tab items={tabItem} onTabClick={handleTabClick} curIndex={curTabIndex}/>
      <CodeEditor code={code} onCodeChange={handleCodeChange}/>
      <div className={style.operator_btn}>
        {prevBtn} {nextBtn}
      </div>
    </div>
  );
}

interface ICodeEditorProps {
  code: string,
  onCodeChange: (edit: any, data: any, value: any) => void,
}

function CodeEditor(props: ICodeEditorProps) {

  const options = {
    mode: 'sass',
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
    <button key={i} onClick={() => props.onTabClick(i)}>
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