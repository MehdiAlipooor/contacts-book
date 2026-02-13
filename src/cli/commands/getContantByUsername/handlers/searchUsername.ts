import { JsonFileManager } from "../../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../../repositories/ContactsRepository";
import { getContactStoragePath } from "../../../../utils/getContactStoragePath";

const jsonFileManager = new JsonFileManager(getContactStoragePath());
const repository = new ContactsRepository(jsonFileManager);

export const searchUsernameHandler = async (username: string) => {
  const response = await repository.search(username);

  return response.map((item) => {
    return {
      description: item.username,
      name: item.username,
      value: item.username,
    };
  });
};
