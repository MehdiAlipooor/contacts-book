import fs from 'node:fs';

export class Storage {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  readFile() {
    return fs.readFileSync(this.filePath, 'utf8');
  }
}
