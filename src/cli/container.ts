import { DatabaseDriver } from "@/lib/DatabaseDriver";
import { ContactsRepository } from "@/repositories/contactsRepository";
import type { ContactEntity } from "@/types";

export const dbDriver = new DatabaseDriver<ContactEntity>();

export const contactsRepository = new ContactsRepository(dbDriver);
