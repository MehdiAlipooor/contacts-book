import type { JsonData } from "../types";
import { convertBufferToJson } from "../utils/convertBufferToJson";
import { handleError } from "../utils/errorHandler";
import { getFileAsync } from "../utils/getFile";
import { insertToFile } from "../utils/insertToFile";
import {
	DuplicatedException,
	NoItemException,
	SavingFileException,
} from "./Exceptions";

export class JsonFileManager {
	cache: JsonData = {};
	private loadPromise: Promise<void> | null = null;

	constructor(private filePath: string) {
		this.preload();
	}

	private preload(): void {
		this.loadPromise = this.loadFile();
	}

	private async loadFile(): Promise<void> {
		try {
			const data = await getFileAsync(this.filePath);
			const list = await convertBufferToJson(data);
			this.cache = list;
		} catch (error) {
			handleError(error);
			this.cache = {};
		}
	}

	getItemByKey(key: string) {
		return this.cache[key];
	}

	getItemByValue(searchValue: string) {
		return Object.entries(this.cache)
			.filter(([_, value]) => value.includes(searchValue))
			.map(([key, value]) => ({ key, value }));
	}

	/**
	 * @description This method update all content of file, not just a record
	 */
	private async saveToFile(input: JsonData) {
		await insertToFile(this.filePath, input, (error) => {
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

	async removeRow(key: string): Promise<void> {
		await this.waitForLoad();

		if (!this.cache[key]) {
			throw new NoItemException("no item exists");
		}

		const { [key]: _, ...newCache } = this.cache;

		await this.saveToFile(newCache);
	}

	async addRow(key: string, value: string): Promise<void> {
		await this.waitForLoad();

		if (this.cache[key]) {
			throw new DuplicatedException("item already exists");
		}

		const newCache = { ...this.cache, [key]: value };

		await this.saveToFile(newCache);
	}

	async waitForLoad(): Promise<void> {
		if (this.loadPromise) {
			await this.loadPromise;
		}
	}

	async getAllRecords(): Promise<JsonData> {
		await this.waitForLoad();
		return this.cache;
	}
}
