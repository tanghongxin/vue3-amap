import { readFileSync, writeFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readJson(filePath: string): Record<string, any> {
  const fileContent = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export function writeJson(filePath: string, data: unknown): void {
  const jsonContent = JSON.stringify(data, null, 2);
  writeFileSync(filePath, jsonContent);
}
