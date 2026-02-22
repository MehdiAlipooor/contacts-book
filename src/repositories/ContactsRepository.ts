import type { DatabaseDriver } from "@/lib/DatabaseDriver";
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
	constructor(private readonly driver: DatabaseDriver<ContactEntity>) {}

	async findAll(): Promise<ContactEntity[]> {
		return await this.driver.getAll();
	}

	async findByUsername(username: string): Promise<ContactEntity | null> {
		return await this.driver.findBy("username", username);
	}

	async findByPhone(phone: string): Promise<ContactEntity | null> {
		return await this.driver.findBy("phone", phone);
	}

	async search(username: string): Promise<ContactEntity[]> {
		return await this.driver.findMany("username", username);
	}

	async create(
		contact: Omit<ContactEntity, "id" | "createdAt" | "updatedAt">,
	): Promise<ContactEntity> {
		return await this.driver.create(contact);
	}

	async update(
		id: string,
		contact: Partial<ContactEntity>,
	): Promise<ContactEntity | null> {
		return await this.driver.update(id, contact);
	}

	async delete(id: string): Promise<void> {
		await this.driver.delete(id);
	}
}
