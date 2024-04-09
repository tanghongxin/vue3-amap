export function toArray(val: string | string[]) {
  if (Array.isArray(val)) return val;
  if (['', null, undefined].includes(val)) return [];
  return [val];
}
