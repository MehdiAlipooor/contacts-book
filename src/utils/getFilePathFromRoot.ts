import { join } from 'node:path';

export function getFilePathFromRoot(filePath: string) {
  return join(__dirname, filePath);
}
