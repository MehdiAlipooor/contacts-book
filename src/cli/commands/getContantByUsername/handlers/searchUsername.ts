import { JsonFileManager } from "../../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../../repositories/ContactsRepository";

const jsonFileManager = new JsonFileManager();
const repository = new ContactsRepository(jsonFileManager);

export const searchUsernameHandler = async (username: string) => {
	const response = await repository.searchUsernames(username);

	return response.map((item) => {
		return {
			description: item.key,
			name: item.key,
			value: item.key,
		};
	});
};
