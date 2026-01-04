import { writeFile } from 'node:fs';

import { JsonData } from '../types';

export async function insertToFile(
  filePath: string,
  data: JsonData,
  onErrorCallback: (err: NodeJS.ErrnoException | null) => void,
) {
  return writeFile(filePath, JSON.stringify(data), onErrorCallback);
}
