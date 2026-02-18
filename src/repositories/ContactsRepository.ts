import type { JsonDriver } from "@/lib/DbDriver";
import type { ContactEntity } from "@/types";

export interface ContactRepositoryContracts {
  findAll(): Promise<ContactEntity[]>;
  findByUsername(username: string): Promise<ContactEntity | null>;
  findByPhone(phone: string): Promise<ContactEntity | null>;
  search(term: string): Promise<ContactEntity[]>;
  create(contact: ContactEntity): Promise<ContactEntity>;
  update(
    id: string,
    contact: Partial<ContactEntity>,
  ): Promise<ContactEntity | null>;
  delete(username: string): Promise<void>;
}

export class ContactsRepository implements ContactRepositoryContracts {
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

  async create(
    contact: Omit<ContactEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<ContactEntity> {
    return await this.jsonDriver.create(contact);
  }

  async update(
    id: string,
    contact: Partial<ContactEntity>,
  ): Promise<ContactEntity | null> {
    return await this.jsonDriver.update(id, contact);
  }

  async delete(id: string): Promise<void> {
    await this.jsonDriver.delete(id);
  }
}
