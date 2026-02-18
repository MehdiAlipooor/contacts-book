import { JsonDriver } from "@/lib/DbDriver";
import {
  type ContactEntity,
  ContactsRepository,
} from "@/repositories/contactsRepository";
import { getContactStoragePath } from "@/utils/getContactStoragePath";

const jsonFileManager = new JsonDriver<ContactEntity>(getContactStoragePath());

export const contactsRepository = new ContactsRepository(jsonFileManager);
