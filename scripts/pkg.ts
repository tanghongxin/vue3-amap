import { resolve } from 'path';
import { readJson, writeJson } from './utils';

const packageJsonPath = resolve(__dirname, '../package.json');

export function getVersion(): string {
  const packageJson = readJson(packageJsonPath);
  return packageJson.version;
}

export function updateVersion(newVersion: string): void {
  const packageJson = readJson(packageJsonPath);
  packageJson.version = newVersion;
  writeJson(packageJsonPath, packageJson);
}
