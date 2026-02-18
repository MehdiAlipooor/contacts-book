// import type { JsonFileManager } from "@/lib/JsonFileManager";
// import type { Contact } from "@/types";

// export interface ContactRepositoryContracts {
//   findAll(): Promise<Contact[]>;
//   findByUsername(username: string): Promise<Contact | null>;
//   findByPhone(phone: string): Promise<Contact[] | null>;
//   search(term: string): Promise<Contact[]>;
//   save(contact: Contact): Promise<void>;
//   delete(username: string): Promise<void>;
// }

// export class ContactsRepository implements ContactRepositoryContracts {
//   constructor(private readonly jsonFileManager: JsonFileManager) {}

//   async findAll(): Promise<Contact[]> {
//     const records = await this.jsonFileManager.getAllRecords();

//     return Object.entries(records).map(([username, phone]) => ({
//       username,
//       phone,
//     }));
//   }

//   async findByUsername(username: string): Promise<Contact | null> {
//     const phone = this.jsonFileManager.getItemByKey(username);

//     if (!phone) return null;

//     return { username, phone };
//   }

//   async findByPhone(phone: string): Promise<Contact[] | null> {
//     const usernames = this.jsonFileManager.getItemByValue(phone);
//     if (!usernames) return null;

//     return usernames.map((item) => {
//       return {
//         username: item.key,
//         phone: item.value,
//       };
//     });
//   }

//   async search(term: string): Promise<Contact[]> {
//     const matches = this.jsonFileManager.searchKeys(term);

//     return matches.map(({ key, value }) => ({
//       username: key,
//       phone: value,
//     }));
//   }

//   private async update(contact: Contact) {
//     await this.jsonFileManager.updateRow(contact.username, contact.phone);
//   }

//   private async create(contact: Contact) {
//     await this.jsonFileManager.addRow(contact.username, contact.phone);
//   }

//   async save(contact: Contact): Promise<void> {
//     const existing = this.jsonFileManager.getItemByKey(contact.username);

//     if (existing) {
//       this.update(contact);
//     } else {
//       this.create(contact);
//     }
//   }

//   async delete(username: string): Promise<void> {
//     await this.jsonFileManager.removeRow(username);
//   }
// }

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

  async save(
    contact: Omit<ContactEntity, "id" | "createdAt" | "updatedAt">,
  ): Promise<ContactEntity> {
    return await this.jsonDriver.create(contact);
  }

  async delete(id: string): Promise<void> {
    await this.jsonDriver.delete(id);
  }
}
