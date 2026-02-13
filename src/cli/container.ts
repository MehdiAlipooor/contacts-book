import { JsonFileManager } from "../lib/JsonFileManager";
import { ContactsRepository } from "../repositories/ContactsRepository";
import { getContactStoragePath } from "../utils/getContactStoragePath";

const jsonFileManager = new JsonFileManager(getContactStoragePath());

export const contactsRepository = new ContactsRepository(jsonFileManager);
