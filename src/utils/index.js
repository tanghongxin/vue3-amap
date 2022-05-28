export function uuid(randomLength = 10) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}
