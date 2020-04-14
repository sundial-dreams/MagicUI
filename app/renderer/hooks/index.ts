import { useEffect, useState } from 'react';

export const useOnMount = (callback: () => void) => {
  useEffect(callback, []);
};


export const useOnUnMount = (callback: () => void) => {
  useEffect(() => callback(), []);
};
