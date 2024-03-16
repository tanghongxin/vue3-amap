export function debounce<T extends(...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timerId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): void {
    clearTimeout(timerId);

    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export function toArray(val: string | string[]) {
  if (Array.isArray(val)) return val;
  if (['', null, undefined].includes(val)) return [];
  return [val];
}
