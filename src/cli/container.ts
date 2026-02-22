import { DatabaseDriver } from "@/lib/DatabaseDriver";
import { ContactsRepository } from "@/repositories/contactsRepository";
import type { ContactEntity } from "@/types";

export const jsonFileManager = new DatabaseDriver<ContactEntity>();

export const contactsRepository = new ContactsRepository(jsonFileManager);
