import { JsonData } from '../types';
import { convertBufferToJson } from '../utils/convertBufferToJson';
import { getFileAsync } from '../utils/getFile';
import { getFilePathFromRoot } from '../utils/getFilePathFromRoot';
import { insertToFile } from '../utils/insertToFile';
import { DuplicatedException, NoItemExeption, SavingFileException } from './Exceptions';

const filePath = getFilePathFromRoot('./../../contacts.json');

export class JsonFileManager {
  private file: JsonData = {};
  cache: JsonData = {};
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  constructor() {
    this.preload();
  }

  private preload(): void {
    this.loadPromise = this.loadFile();
  }

  private async loadFile(): Promise<void> {
    try {
      const data = await getFileAsync(filePath);
      const list = await convertBufferToJson(data);
      this.file = list;
      this.cache = list;
    } catch (error) {
      this.file = {};
      this.cache = {};
    }
  }

  getItemByKey(key: string) {
    return this.cache[key];
  }

  getItemByValue(searchValue: string) {
    return Object.keys(this.cache).filter((key) => this.cache[key] === searchValue);
  }

  /**
   * @description This method update all content of file, not just a record
   */
  private async saveToFile(input: JsonData) {
    await insertToFile(filePath, input, (error) => {
      if (error) {
        throw new SavingFileException('an error happened while saving file');
      }
    });

    this.cache = input;
  }

  updateRow(key: string, value: string) {
    if (!this.cache[key]) {
      throw new NoItemExeption('username not found');
    }

    const newCache = this.cache;
    newCache[key] = value;

    this.saveToFile(newCache);
  }

  removeRow(key: string) {
    if (!this.cache[key]) {
      throw new NoItemExeption('no item exists');
    }

    const filteredCache = this.cache;
    delete filteredCache[key];

    this.saveToFile(filteredCache);
  }

  addRow(key: string, value: string) {
    if (this.cache[key]) {
      throw new DuplicatedException('item already exists');
    }
    const newCache = { ...this.cache, [key]: value };
    this.saveToFile(newCache);
  }

  async waitForLoad(): Promise<void> {
    if (this.loadPromise) {
      await this.loadPromise;
    }
  }

  async getAllRecords(): Promise<JsonData> {
    await this.waitForLoad();
    return this.file;
  }
}
