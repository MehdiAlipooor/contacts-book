import { JsonDriver } from "@/lib/JsonDriver";
import { ContactsRepository } from "@/repositories/contactsRepository";
import type { ContactEntity } from "@/types";
import { getContactStoragePath } from "@/utils/getContactStoragePath";

const jsonFileManager = new JsonDriver<ContactEntity>(getContactStoragePath());

export const contactsRepository = new ContactsRepository(jsonFileManager);
