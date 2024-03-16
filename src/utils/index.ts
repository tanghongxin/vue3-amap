import { App, Plugin } from 'vue';

export function uuid(randomLength = 10) {
  return Number(Math.random().toString().substr(2, randomLength) + Date.now()).toString(36);
}

export function immediateInterval(cb, ms, ...argus) {
  cb(...argus);
  return setInterval(cb, ms, ...argus);
}

export const withInstall = <T>(comp: T, plugins: string[] = []) => {
  type P = { plugins?: string[] }

  const c = comp as any;
  c.plugins = plugins;
  c.install = (app: App) => app.component(c.name || c.name, comp);

  return comp as T & P & Plugin;
};
