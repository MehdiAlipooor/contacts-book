import { randomUUID } from "node:crypto";
import { EventEmitter } from "node:events";
import { readFile, writeFile } from "node:fs/promises";
import { NoRecordExists } from "@/lib/Exceptions";
import type { BaseEntity, ID } from "@/types";

export interface DatabaseDriverContracts<T extends BaseEntity> {
	// Queries
	findById(id: ID): Promise<T | null>;
	getAll(): Promise<T[]>;
	findBy<K extends keyof T>(key: K, value: T[K]): Promise<T | null>;
	findMany<K extends keyof T>(key: K, value: string): Promise<T[]>;

	// Commands
	create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
	update(id: ID, payload: Partial<T>): Promise<T | null>;
	delete(id: ID): Promise<boolean>;
}

export class DatabaseDriver<T extends BaseEntity>
	extends EventEmitter
	implements DatabaseDriverContracts<T>
{
	private storage: T[] = [];
	private filePath: string = "";

	private async read(): Promise<T[]> {
		const file = await readFile(this.filePath, "utf-8");
		const parsed = JSON.parse(file);

		return (Array.isArray(parsed) ? parsed : [parsed]) as T[];
	}

	async connect(filePath: string) {
		this.filePath = filePath;
		try {
			this.storage = await this.read();
			this.emit("connect", { message: "Connected to db" });
		} catch {
			this.emit("error", { message: "Error on db connection" });
		}
	}

	private async write(data: T[]): Promise<void> {
		await writeFile(this.filePath, JSON.stringify(data), "utf-8");
		this.storage = data;
	}

	async getAll(): Promise<T[]> {
		return this.storage;
	}

	async findById(id: ID): Promise<T | null> {
		return await this.findBy("id", id);
	}

	async findBy<K extends keyof T>(key: K, value: T[K]): Promise<T | null> {
		return this.storage.find((item) => item[key] === value) ?? null;
	}

	async findMany<K extends keyof T>(key: K, value: string): Promise<T[]> {
		return this.storage.filter((item) => (item[key] as string).includes(value));
	}

	async create(payload: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
		const now = new Date().toISOString();

		const entity: T = {
			...payload,
			id: randomUUID(),
			createdAt: now,
			updatedAt: now,
		} as T;

		this.storage.push(entity);

		await this.write(this.storage);
		return entity;
	}

	async update(id: ID, payload: Partial<T>): Promise<T | null> {
		const index = this.storage.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new NoRecordExists("No record exists");
		}

		const updated: T = {
			...this.storage[index],
			...payload,
			updatedAt: new Date().toISOString(),
		};

		this.storage[index] = updated;

		await this.write(this.storage);
		return updated;
	}

	async delete(id: ID): Promise<boolean> {
		const data = this.storage;

		const filtered = data.filter((item) => item.id !== id);

		if (filtered.length === data.length) return false;

		await this.write(filtered);

		return true;
	}
}
