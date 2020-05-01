import {useCallback, useEffect, useState} from 'react';
import {callbackify} from 'util';
import {throttle} from '../utils';

export const useOnMount = (callback: () => void) => {
  useEffect(callback, []);
};


export const useOnUnMount = (callback: () => void) => {
  useEffect(() => callback(), []);
};

export const useResize = (callback: () => void) => {
  const [state, setState] = useState({width: window.innerWidth, height: window.innerHeight});
  useOnMount(() => {
    window.onresize = throttle(() => {
      console.log('window on resize');
      setState({ width: window.innerWidth, height: window.innerHeight });
      callback();
    });
  });
  return state;
};


export const useInput = (defaultValue: string = ''): [string, (e: any) => void] => {
  const [value, setValue] = useState(defaultValue);
  const changeValue = (e: any) => {
    setValue(e.target.value)
  };
  return [value, changeValue]
};