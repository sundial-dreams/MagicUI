import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Avatar } from '../public/components';

import { faCircleNotch, faArrowRight, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import style from './Login.scss';
import { cls } from '../public/utils';
import { throttle } from '../public/utils';
import { fetchLoginEmail, fetchLoginPassword } from './utils';
import Bridge from '../public/utils/bridge';

const icons = {
  ok: <FontAwesomeIcon icon={faCheck} color="green"/>,
  error: <FontAwesomeIcon icon={faTimes} color="red"/>,
  loading: <FontAwesomeIcon icon={faCircleNotch} color="green" spin/>,
  empty: null
};

export default function Login() {
  const [src, setSrc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailResultIcon, setEmailResultIcon] = useState(icons.empty);
  const [passwordResultIcon, setPasswordResultIcon] = useState(icons.empty);


  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    setEmail(email);
    setEmailResultIcon(icons.loading as any);
    throttle(() => {
      fetchLoginEmail(email).then(v => {
        if (v.err) {
          setEmailResultIcon(icons.error as any);
          return;
        }
        setEmailResultIcon(icons.ok as any);
        setSrc(v.avatar);
      });
    })();
  };

  const handlePasswordChange = (e: any) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordResultIcon(icons.loading as any);
    throttle(() => {
      fetchLoginPassword(email, password).then(v => {
        if (v.err) {
          setPasswordResultIcon(icons.error as any);
          return;
        }
        setPasswordResultIcon(icons.ok as any);
      });
    })();
  };

  const handleLogin = () => {
    if (emailResultIcon === icons.ok && passwordResultIcon === icons.ok) {
      Bridge.openMainWindow({email, password, avatar: src});
    }
  };

  return (
    <div className={style.login}>
      <div className={style.avatar_wrapper}>
        <Avatar src={src} size={80}/>
      </div>
      <div className={style.input_wrapper}>
        <div className={cls(style.input, style.input_email)}>
          <input type="text" placeholder="Email..." value={email} onChange={handleEmailChange}/>
          <span>{emailResultIcon}</span>
        </div>
        <div className={cls(style.input, style.input_password)}>
          <input type="password" placeholder="Password..." value={password} onChange={handlePasswordChange}/>
          <span>{passwordResultIcon}</span>
        </div>
      </div>
      <div className={style.login_btn}>
        <button onClick={handleLogin}>
          LOGIN
          <span>
            <FontAwesomeIcon icon={faArrowRight}/>
          </span>
        </button>
      </div>
    </div>
  );
}