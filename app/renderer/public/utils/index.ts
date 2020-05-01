export const cls = (...args: string[]) => args.filter(Boolean).join(' ');

export const throttle = (fn: Function, time: number = 500) => {
  let flag = true;
  return (...args: any[]) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn(...args);
      flag = true;
    }, time);
  };
};

export const debounce = (fn: Function, time: number = 500) => {
  let timer:any = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
}