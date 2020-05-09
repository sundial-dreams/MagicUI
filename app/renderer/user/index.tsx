import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ControlButtonGroup } from '../public/components';
import { minimize, close, logout } from './utils';

import { Avatar } from './components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { cls } from '../public/utils';


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
  const [canEditEmail, setCanEditEmail] = useState(false);

  const [password, setPassword] = useState('');
  const [canEditPassword, setCanEditPassword] = useState(false);

  useEffect(() => {
    ipcRenderer.on('user-data', (event, args) => {
      setEmail(args.email);
      setPassword(args.password);
      setAvatar(args.avatar);
      setNickname(args.nickname);
    });
  }, []);

  return (
    <div className={style.app}>
      <div className={style.header}>
        <ControlButtonGroup minimize onMinimize={minimize} close onClose={close}/>
      </div>
      <div className={style.content}>
        <div className={style.avatar_wrapper}>
          <Avatar src={avatar || DEFAULT_AVATAR} onClick={() => {
          }} size={100}/>
        </div>
        <div className={style.info_wrapper}>
          <div className={cls(style.input, canEditNickname && style.edit)}>
            <input value={nickname} disabled={!canEditNickname} onChange={e => setNickname(e.target.value)}/>
            <button onClick={() => setCanEditNickname(canEditNickname => !canEditNickname)}>
              {canEditNickname ? check : edit}
            </button>
          </div>
          <div className={cls(style.input, canEditEmail && style.edit)}>
            <input value={email} disabled={!canEditEmail} onChange={e => setEmail(e.target.value)}/>
            <button onClick={() => setCanEditEmail(canEditEmail => !canEditEmail)}>
              {canEditEmail ? check : edit}
            </button>
          </div>
          <div className={cls(style.input, canEditPassword && style.edit)}>
            <input type={canEditPassword ? 'text' : 'password'} value={password} disabled={!canEditPassword}
                   onChange={e => setPassword(e.target.value)}/>
            <button onClick={() => setCanEditPassword(canEditPassword => !canEditPassword)}>
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