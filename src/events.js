const isfun = function (fn) {
  return typeof fn === 'function';
}

export default new class Event{
  constructor() {
    this.clientList = {};
  }
  subscribe(...arg) {
    const [key, fn] = arg;
    if (!isfun(fn)) throw new TypeError(`arguments[1] for function ${this.subscribe.name} must be a function`);
    if (!this.clientList[key]) this.clientList[key] = [];
    this.clientList[key].push(fn);
  }
  publish(...arg) {
    const [key, ...params] = arg,
      fns = this.clientList[key];
    if (!fns || fns.length === 0) return;
    for (const fn of fns) {
      fn.apply(this, params);
    }
  }
  unsubscribe(...arg) {
    const [key, fn] = arg,
      fns = this.clientList[key];
    if (!fns) return;
    if (!fn) {
      fns && (fns.length = 0);
    } else{
      for (let l = fns.length - 1; l >= 0; l--) {
        let _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  }
};

