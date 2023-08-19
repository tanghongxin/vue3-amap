export function debounce(func, delay) {
  let timerId;

  // eslint-disable-next-line func-names
  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
