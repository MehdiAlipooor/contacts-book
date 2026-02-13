import type { JsonData } from "../types";
import { convertBufferToJson } from "../utils/convertBufferToJson";
import { handleError } from "../utils/errorHandler";
import { getFileAsync } from "../utils/getFile";
import { getFilePathFromRoot } from "../utils/getFilePathFromRoot";
import { insertToFile } from "../utils/insertToFile";
import {
  DuplicatedException,
  NoItemException,
  SavingFileException,
} from "./Exceptions";

const filePath = getFilePathFromRoot("./../storage/contacts.json");

export class JsonFileManager {
  private file: JsonData = {};
  cache: JsonData = {};
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
      handleError(error);
      this.file = {};
      this.cache = {};
    }
  }

  getItemByKey(key: string) {
    return this.cache[key];
  }

  getItemByValue(searchValue: string) {
    return Object.keys(this.cache).filter(
      (key) => this.cache[key] === searchValue,
    );
  }

  /**
   * @description This method update all content of file, not just a record
   */
  private async saveToFile(input: JsonData) {
    await insertToFile(filePath, input, (error) => {
      if (error) {
        throw new SavingFileException("an error happened while saving file");
      }
    });

    this.cache = input;
  }

  async updateRow(key: string, value: string) {
    if (!this.cache[key]) {
      throw new NoItemException("username not found");
    }

    const newCache = { ...this.cache, [key]: value };
    newCache[key] = value;

    await this.saveToFile(newCache);
  }

  /**
   * Search for items where the key contains the search term
   * @returns Array of matching key-value pairs
   */
  searchKeys(searchTerm: string): Array<{ key: string; value: string }> {
    return Object.entries(this.cache)
      .filter(([key]) => key.includes(searchTerm))
      .map(([key, value]) => ({ key, value }));
  }

  removeRow(key: string) {
    if (!this.cache[key]) {
      throw new NoItemException("no item exists");
    }

    const newCache = { ...this.cache, [key]: value };

    this.saveToFile(newCache);
  }

  addRow(key: string, value: string) {
    if (this.cache[key]) {
      throw new DuplicatedException("item already exists");
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
