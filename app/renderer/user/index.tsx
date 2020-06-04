import { ipcRenderer, remote } from 'electron';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ControlButtonGroup } from '../public/components';
import { minimize, close, logout, modifyUser } from './utils';

import { EditableAvatar } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { cls } from '../public/utils';


import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';
// @ts-ignore
import style from './index.scss';

const DEFAULT_AVATAR = 'http://localhost:9000/image/default_avatar.jpeg';

const edit = <FontAwesomeIcon icon={faEdit}/>;
const check = <FontAwesomeIcon icon={faCheck}/>;

function App() {
  const [avatar, setAvatar] = useState('');
  const [nickname, setNickname] = useState('');
  const [canEditNickname, setCanEditNickname] = useState(false);

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [canEditPassword, setCanEditPassword] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nicknameRef = useRef("");
  useEffect(() => {
    ipcRenderer.on('user-data', (event, args) => {
      setEmail(args.email);
      setPassword(args.password);
      setAvatar(args.avatar);
      setNickname(args.nickname);
      emailRef.current = args.email;
      passwordRef.current = args.password;
      nicknameRef.current = args.nickname;
    });
    ipcRenderer.on('avatar-data', (event, args) => {
      const email = emailRef.current as unknown as string;
      const nickname = nicknameRef.current as unknown as string;
      const password = passwordRef.current as unknown as string;

      modifyUser(email, nickname, password, args.source).then(() => {
        setAvatar(args.source);
        const user = { email, nickname, password, avatar: args.source };
        Bridge.update(user).then();
        remote.getCurrentWindow().getParentWindow().webContents.send(
          'update-user-data',
          user
        );
      });
    });
  }, []);

  const handleModifyName = () => {
    modifyUser(email, nickname, password, avatar).then(() => {
      setCanEditNickname(false);
      const user = { email, nickname, password, avatar };
      Bridge.update(user).then();
      remote.getCurrentWindow().getParentWindow().webContents.send(
        'update-user-data',
        user
      );
    });
  };

  const handleModifyPassword = () => {
    modifyUser(email, nickname, password, avatar).then(() => {
      setCanEditPassword(false);
      const user = { email, nickname, password, avatar };
      Bridge.update(user).then();
      remote.getCurrentWindow().getParentWindow().webContents.send(
        'update-user-data',
        user
      );
    });
  };

  const selectAvatar = () => {
    Bridge.open(WidgetType.AVATAR);
  };

  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup close onClose={close}/>
      </div>
      <div className={style.content}>
        <div className={style.avatar_wrapper}>
          <EditableAvatar src={avatar || DEFAULT_AVATAR} onClick={selectAvatar} size={100}/>
        </div>
        <div className={style.info_wrapper}>
          <div className={cls(style.input)}>
            <input value={email} disabled/>
          </div>
          <div className={cls(style.input, canEditNickname && style.edit)}>
            <input value={nickname} disabled={!canEditNickname}
                   onChange={e => ((nicknameRef.current = e.target.value),setNickname(e.target.value))}/>
            <button onClick={canEditNickname ? handleModifyName : () => setCanEditNickname(true)}>
              {canEditNickname ? check : edit}
            </button>
          </div>
          <div className={cls(style.input, canEditPassword && style.edit)}>
            <input type={canEditPassword ? 'text' : 'password'} value={password} disabled={!canEditPassword}
                   onChange={e => ((passwordRef.current = e.target.value), setPassword(e.target.value))}/>
            <button onClick={canEditPassword ? handleModifyPassword : () => setCanEditPassword(true)}>
              {canEditPassword ? check : edit}
            </button>
          </div>
        </div>
        <div className={style.logout_wrapper}>
          <button onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>, document.getElementById('app'));