import { randomUUID } from "crypto";
import { readFile, rename, writeFile } from "fs/promises";
import type { BaseEntity, ID } from "@/types";

export interface StorageDriver<T extends BaseEntity> {
  findById(id: ID): Promise<T | null>;
  findAll(): Promise<T[]>;

  findBy<K extends keyof T>(key: K, value: T[K]): Promise<T | null>;

  findMany<K extends keyof T>(key: K, value: T[K]): Promise<T[]>;

  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;

  update(id: ID, payload: Partial<T>): Promise<T | null>;

  delete(id: ID): Promise<boolean>;
}

export class JsonDriver<T extends BaseEntity> implements StorageDriver<T> {
  constructor(private readonly filePath: string) {}

  private async read(): Promise<T[]> {
    try {
      const file = await readFile(this.filePath, "utf-8");
      const parsed = JSON.parse(file);

      if (!Array.isArray(parsed)) {
        throw new Error("Storage is not array");
      }

      return parsed as T[];
    } catch {
      return [];
    }
  }

  private async write(data: T[]): Promise<void> {
    const tempPath = `${this.filePath}.tmp`;
    const json = JSON.stringify(data, null, 2);

    await writeFile(tempPath, json, "utf-8");
    await rename(tempPath, this.filePath);
  }

  async findAll(): Promise<T[]> {
    return await this.read();
  }

  async findById(id: ID): Promise<T | null> {
    const data = await this.read();
    return data.find((item) => item.id === id) ?? null;
  }

  async findBy<K extends keyof T>(key: K, value: T[K]): Promise<T | null> {
    const data = await this.read();
    return data.find((item) => item[key] === value) ?? null;
  }

  async findMany<K extends keyof T>(key: K, value: T[K]): Promise<T[]> {
    const data = await this.read();
    return data.filter((item) => item[key] === value);
  }

  async create(payload: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> {
    const data = await this.read();

    const now = new Date().toISOString();

    const entity: T = {
      ...payload,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    } as T;

    data.push(entity);

    await this.write(data);

    return entity;
  }

  async update(id: ID, payload: Partial<T>): Promise<T | null> {
    const data = await this.read();

    const index = data.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const updated: T = {
      ...data[index],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    data[index] = updated;

    await this.write(data);

    return updated;
  }

  async delete(id: ID): Promise<boolean> {
    const data = await this.read();

    const filtered = data.filter((item) => item.id !== id);

    if (filtered.length === data.length) return false;

    await this.write(filtered);

    return true;
  }
}
