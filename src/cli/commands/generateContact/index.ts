import { createCliModule } from "@/lib/createCliModule";
import { generateContractHandler } from "./handler";
import { generateContactSchema } from "./schema";

async function action(response: Record<string, string>) {
	const { username, phone } = response;
	await generateContractHandler({ username, phone });
}

const prompts = generateContactSchema();

export const generateContact = () =>
	createCliModule({
		prompts,
		action,
	});
