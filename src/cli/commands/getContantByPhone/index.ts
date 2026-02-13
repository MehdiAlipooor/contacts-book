import { createCliModule } from "../../../lib/createCliModule";
import { getContactByPhoneHandler } from "./handler";
import { getContantByPhoneSchema } from "./schema";

async function action(response: Record<string, string>) {
	await getContactByPhoneHandler({ phone: response.phone });
}

const prompts = getContantByPhoneSchema();

export const getContantByPhone = () =>
	createCliModule({
		prompts,
		action,
	});
