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

const cachedCode = [[], [], []] as string[][];
const tabItems = [
  ['DSL'],
  ['HTML', 'REACT']
];
const codeMode = [
  [['sass']],
  [['htmlmixed'], ['jsx', 'sass']]
];
const codeType = [
  [['dsl']],
  [['html'], ['jsx', 'sass']]
];

export interface IViewsProps {

}

export default function Views(props: IViewsProps) {
  const [code, setCode] = useState([] as string[]);
  const [dslCode, setDslCode] = useState('');
  const [curStep, setCurStep] = useState(0);
  const [tabItem, setTabItem] = useState([] as string[]);
  const [curTabIndex, setCurTabIndex] = useState(0);
  const [tabItemArray, setTabItemArray] = useState(tabItems);
  const [codeModeArray, setCodeModeArray] = useState(codeMode);
  const [codeTypeIndex, setCodeTypeIndex] = useState(0);

  useEffect(() => {
    ipcRenderer.on('code', (event, args) => {
      if (args.type === 'json') {
        let dsl = jsonToDslCode(args.data);
        setCode([dsl]);
        setTabItem(tabItems[0]);
        cachedCode[0] = [dsl];
        setDslCode(dsl);
        return;
      }
      if (args.type === 'target') {
        setTabItemArray([tabItems[1]]);
        setTabItem(tabItems[1]);
        setCodeModeArray([codeMode[1]]);
        setDslCode(args.data);
        setCurStep(1);
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
      setCodeTypeIndex(0);
      return curStep - 1;
    });
  };

  const handleNextStep = () => {
    if (curStep >= tabItemArray.length - 1) return;

    setCurStep(curStep => {
      if (curStep === 0) {
        Bridge.compile('html', code[0]).then((html) => {
          cachedCode[curStep + 1] = html;
          setCode(html);
        });
      }

      setTabItem(tabItemArray[curStep + 1]);
      setCurTabIndex(0);
      setCodeTypeIndex(0);
      return curStep + 1;
    });
  };

  const handleTabClick = (i: number) => {
    setCurTabIndex(i);
    setCodeTypeIndex(0);
    if (i === 1) {
      Bridge.compile('react', dslCode).then((react) => {
        cachedCode[curStep + i] = react;
        setCode(react);
      })
    }
    if (i === 0) {
      Bridge.compile('html', dslCode).then((html) => {
        cachedCode[curStep + i] = html;
        setCode(html);
      })
    }
  }

  const handleCodeChange = (edit: any, data: any, value: any) => {
    setCode(value);
  };

  const handleExport = () => {
    saveCodeFile(tabItems[curStep][curTabIndex], code).then(() => {

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
      <CodeEditor code={code[codeTypeIndex]}
                  onCodeChange={handleCodeChange}
                  mode={codeMode[curStep][curTabIndex][codeTypeIndex]}
                  codeTypes={codeType[curStep][curTabIndex]}
                  curCodeType={codeTypeIndex}
                  onCodeTypeTabClick={(i) => setCodeTypeIndex(i)}/>
      <div className={style.operator_btn}>
        {prevBtn}
        {curStep === tabItems.length - 1 ? exportBtn : nextBtn}
      </div>
    </div>
  );
}

interface ICodeEditorProps {
  code: string,
  onCodeChange: (edit: any, data: any, value: any) => void,
  mode: string,
  codeTypes: string[],
  curCodeType: number,
  onCodeTypeTabClick: (i: number) => void
}

function CodeEditor(props: ICodeEditorProps) {

  const options = {
    mode: props.mode,
    theme: 'material',
    lineNumbers: true
  };
  const tab = (
    <div className={style.editor_tab}>
      {props.codeTypes.map((v, i) => {
        const click = () => props.onCodeTypeTabClick(i);
        return (
          <button key={i} className={cls(i === props.curCodeType && style.active)} onClick={click}>
            {v}
          </button>
        );
      })}
    </div>
  );
  return (
    <div className={style.code_editor}>
      {tab}
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