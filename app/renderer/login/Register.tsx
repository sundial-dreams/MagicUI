import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInbox, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { history, registerUser } from './utils';
import { EditableAvatar } from '../public/components';
import { cls } from '../public/utils';
import Bridge from '../public/utils/bridge';
import { WidgetType } from '../public/utils/constants';

// @ts-ignore
import style from './Register.scss';

const defaultAvatar = 'http://localhost:9000/image/app.png';
export default function Register() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [source, setSource] = useState('');

  useEffect(() => {
    ipcRenderer.on('avatar-data', (event, args) => {
      setSource(args.source);
    });
  }, []);

  const handleSelectAvatar = () => {
    Bridge.open(WidgetType.AVATAR);
  };

  const handleRegister = () => {
    if (email && nickname && password) {
      registerUser(source || defaultAvatar, email, nickname, password).then(res => {
        if (res.err) {
          setError(true);
        }
        history.push('/');
      });
    }
  };

  return (
    <div className={style.register}>
      <div className={style.avatar_wrapper}>
        <EditableAvatar size={100} src={source || defaultAvatar} onClick={handleSelectAvatar}/>
      </div>
      <div className={style.input_wrapper}>
        <div className={cls(style.input, style.email, error && style.error)}>
          <span>
            <FontAwesomeIcon icon={faInbox}/>
          </span>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email..."/>
        </div>
        <div className={cls(style.input, style.nickname)}>
          <span>
            <FontAwesomeIcon icon={faUser}/>
          </span>
          <input value={nickname} onChange={e => setNickname(e.target.value)} placeholder="nickname..."/>
        </div>
        <div className={cls(style.input, style.password)}>
          <span>
            <FontAwesomeIcon icon={faLock}/>
          </span>
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password..."/>
        </div>
      </div>
      <div className={style.register_btn}>
        <button onClick={handleRegister}>
          Register
        </button>
      </div>
      <div className={style.login_btn}>
        <button onClick={() => history.push('/')}>
          <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
      </div>
    </div>
  );
}