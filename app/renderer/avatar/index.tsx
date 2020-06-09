import React, { useEffect, useState } from 'react';
import { remote } from 'electron';
import ReactDOM from 'react-dom';
import { Avatar, ControlButtonGroup } from '../public/components';

import { fetchAvatars, close } from './utils';
import { cls } from '../public/utils';
// @ts-ignore
import style from './index.scss';
const defaultAvatar = 'http://localhost:9000/image/anime-1.jpeg';

function App() {
  const [avatarList, setAvatarList] = useState([] as { id: string, source: string, name: string, type: string }[]);
  const [selected, setSelected] = useState(0);
  const [avatar, setAvatar] = useState({ id: '', source: '', name: '', type: '' });
  useEffect(() => {

    fetchAvatars().then(res => {
      if (!res.err) {
        setAvatarList(res.avatars);
        setAvatar(res.avatars[0]);
      }
    });
  }, []);
  const handleSelect = (index: number) => {
    setSelected(index);
    setAvatar(avatarList[index]);
  };

  const selectAvatar = () => {
    remote.getCurrentWindow().getParentWindow().webContents.send('avatar-data', { ...avatar });
    close();
  };

  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close}/>
      </div>
      <div className={style.content}>
        <div className={style.left}>
          <Avatar size={80} src={avatar.source || defaultAvatar}/>
          <span>{avatar.name || ''}</span>
        </div>
        <div className={style.right}>
          <AvatarList avatars={avatarList} selected={selected} onSelect={handleSelect}/>
        </div>
      </div>
      <div className={style.footer}>
        <button onClick={selectAvatar}>SELECT</button>
      </div>
    </div>
  );
}

interface IAvatarList {
  avatars: { id: string, source: string, type: string }[],
  selected: number,
  onSelect: (selected: number) => void
}

function AvatarList(props: IAvatarList) {
  const content = props.avatars.map((value, index) => {
    const handleSelect = () => {
      props.onSelect(index);
    };
    return (
      <AvatarItem key={value.id} selected={props.selected === index} src={value.source} onSelect={handleSelect}/>
    );
  });
  return (
    <div className={style.avatar_list}>
      <h4>AVATAR LIST</h4>
      <div className={style.list}>
        {content}
      </div>
    </div>
  );
}


function AvatarItem(props: { selected: boolean, onSelect: () => void, src: string }) {
  return (
    <button className={cls(style.avatar_item, props.selected && style.selected)}
            onClick={props.onSelect}>
      <img src={props.src} alt="none"/>
    </button>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));
