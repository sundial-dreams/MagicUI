export const cls = (...args: (string | boolean)[]) => args.filter(Boolean).join(' ');

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
  let timer: any = null;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
};

export const EventEmitter = function () {
  const pool = new Map<string, Function[]>();
  return {
    on(event: string, callback: Function) {
      if (pool.has(event)) {
        pool.get(event)?.push(callback);
        return;
      }
      pool.set(event, [callback]);
    },
    emit(event: string, ...args: any[]) {
      if (pool.has(event)) {
        pool.get(event)?.forEach(callback => callback(...args));
      }
    }
  };
}();