import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

export function run(command: string): string {
  const output = execSync(command, { stdio: 'pipe' }).toString().trim();
  console.log(output);
  return output;
}

export function readJson(filePath: string): any {
  const fileContent = readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
}

export function writeJson(filePath: string, data: any): void {
  const jsonContent = JSON.stringify(data, null, 2);
  writeFileSync(filePath, jsonContent);
}
