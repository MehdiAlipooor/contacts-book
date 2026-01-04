import { readFile } from 'node:fs';

export function getFileAsync(filePath: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    readFile(filePath, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

export function getFile(
  filePath: string,
  callback: (err: NodeJS.ErrnoException | null, data: Buffer) => void,
): void {
  readFile(filePath, callback);
}
