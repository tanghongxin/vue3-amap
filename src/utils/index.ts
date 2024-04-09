import { App, Plugin } from 'vue';

export const withInstall = <T>(comp: T, plugins: string[] = []) => {
  type P = { plugins?: string[] }

  const c = comp as any;
  c.plugins = plugins;
  c.install = (app: App) => app.component(c.name || c.name, comp);

  return comp as T & P & Plugin;
};
