export const cls = (...args: string[]) => args.filter(Boolean).join(' ');

export const throttle = (fn: Function, time: number = 500) => {
  let now = +Date.now();

  return () => {
     if (+Date.now() - now < time)
       return;
     now = +Date.now();
     fn();
  };
};