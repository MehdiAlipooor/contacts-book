import type { JsonDriver } from "@/lib/DbDriver";
import type { BaseEntity } from "@/types";

export interface ContactEntity extends BaseEntity {
  username: string;
  phone: string;
}

export interface ContactRepositoryContracts {
  findAll(): Promise<ContactEntity[]>;
  findByUsername(username: string): Promise<ContactEntity | null>;
  findByPhone(phone: string): Promise<ContactEntity | null>;
  search(term: string): Promise<ContactEntity[]>;
  save(contact: ContactEntity): Promise<ContactEntity>;
  delete(username: string): Promise<void>;
}

export class NewRepository implements ContactRepositoryContracts {
  constructor(private readonly jsonDriver: JsonDriver<ContactEntity>) {}

  async findAll(): Promise<ContactEntity[]> {
    return await this.jsonDriver.findAll();
  }

  async findByUsername(username: string): Promise<ContactEntity | null> {
    return await this.jsonDriver.findBy("username", username);
  }

  async findByPhone(phone: string): Promise<ContactEntity | null> {
    return await this.jsonDriver.findBy("phone", phone);
  }

  async search(username: string): Promise<ContactEntity[]> {
    return await this.jsonDriver.findMany("username", username);
  }

  async save(
    contact: Omit<ContactEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<ContactEntity> {
    return await this.jsonDriver.create(contact);
  }

  async delete(id: string): Promise<void> {
    await this.jsonDriver.delete(id);
  }
}
