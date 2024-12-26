import { readFileSync, writeFileSync } from 'fs';

export function readJson(filePath: string): unknown {
  const fileContent = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export function writeJson(filePath: string, data: unknown): void {
  const jsonContent = JSON.stringify(data, null, 2);
  writeFileSync(filePath, jsonContent);
}
