import { contactsRepository } from "@/cli/container";
import { createCliModule } from "@/lib/createCliModule";
import { removeContactHandler } from "./handler";
import { removeContactSchema } from "./schema";

export const searchUsernameHandler = async (username: string) => {
	const response = await contactsRepository.search(username);

	return response.map((item) => {
		return {
			description: item.username,
			name: item.username,
			value: item.username,
		};
	});
};

async function onSearch(username: string) {
	return await searchUsernameHandler(username);
}

async function action(response: Record<string, string>) {
	await removeContactHandler({ username: response.username });
}

const prompts = removeContactSchema({ onSearch });

export const removeContact = () =>
	createCliModule({
		prompts,
		action,
	});
