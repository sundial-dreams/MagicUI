import React, { useState } from 'react';
// @ts-ignore
import style from './index.scss';
import { cls } from '../../../public/utils';
import { useDispatch, useSelector } from 'react-redux';
import { IStoreState } from '../../store';
import { saveSettings } from '../../actions';


export default function Settings() {
  const [index, setIndex] = useState(0);
  const settings = useSelector((state: IStoreState) => state.settings);
  console.log('settings', settings);
  const handleSelect = (i: number) => {
    setIndex(i);
  };

  const settingsContents = [
    <NormalSettingsContents/>,
    <AppearanceSettingsContents/>
  ];

  return (
    <div id="page" className={style.settings}>
      <div className={style.header_navigation}/>
      <div className={style.content}>
        <h5 className={style.title}>Settings</h5>
        <div className={style.settings_wrapper}>
          <div className={style.left_panel}>
            <SettingsItems index={index} onSelect={handleSelect}/>
          </div>
          <div className={style.content_panel}>
            {settingsContents[index]}
          </div>
        </div>
      </div>
    </div>
  );
}

// 756831
function SettingsItems(props: { index: number, onSelect: (i: number) => void }) {
  console.log(props.index);
  return (
    <div className={style.settings_items}>
      <button className={cls(props.index === 0 && style.active)} onClick={() => props.onSelect(0)}>Normal</button>
      <button className={cls(props.index === 1 && style.active)} onClick={() => props.onSelect(1)}>Appearance</button>
    </div>
  );
}

function NormalSettingsContents() {
  const [on, setOn] = useState(true);
  const settings = useSelector((state: IStoreState) => state.settings);
  const dispatch = useDispatch();
  const handleOn = () => {
    setOn(on => !on);
    dispatch(saveSettings({ theme: settings.theme, autoSave: !on }));
  };
  return (
    <div className={style.normal_settings_content}>
      <h4>Auto Save UI</h4>
      <p>it can help you to auto save editing ui, but not good</p>
      <div className={style.ctrl}>
        <span>{on ? 'ON' : 'OFF'}</span>
        <button className={cls(on && style.active)} onClick={handleOn}>
          <span/>
        </button>
      </div>
    </div>
  );
}

const themes = [
  'dark', 'light'
];

function AppearanceSettingsContents() {
  const [theme, setTheme] = useState('dark');
  const [open, setOpen] = useState(false);
  const settings = useSelector((state: IStoreState) => state.settings);
  const dispatch = useDispatch();

  return (
    <div className={style.normal_settings_content}>
      <h4>System theme</h4>
      <p>it is system used theme</p>
      <div className={style.ctrl}>
        <button className={style.select_item} onClick={() => setOpen(open => !open)}>
          {theme}
        </button>
        <div className={cls(style.card, open && style.show)}>
          {themes.map((v, i) => {
            const click = () => {
              setTheme(themes[i]);
              setOpen(false);
              dispatch(saveSettings({theme: themes[i], autoSave: settings.autoSave}))
            };
            return (<button key={i} onClick={click}>{v}</button>);
          })}
        </div>
      </div>
    </div>
  );
}
