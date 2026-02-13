import { createCliModule } from "../../../lib/createCliModule";
import { updateContacHandler } from "./handler";
import { updateContactSchema } from "./schema";

async function action(response: Record<string, string>) {
	const { username, phone } = response;
	await updateContacHandler({ username, phone });
}

const prompts = updateContactSchema();

export const updateContact = () =>
	createCliModule({
		prompts,
		action,
	});
