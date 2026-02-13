import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import type { GetContactByPhoneHandler } from "./types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const repository = new ContactsRepository(jsonFileManager);

export const getContactByPhoneHandler: GetContactByPhoneHandler = async ({
	phone,
}) => {
	spinnerLoader.show();
	await wait();

	try {
		const response = repository.getByPhoneNumber(phone);
		if (!response || !response.length) {
			spinnerLoader.error("No contact found");
			return;
		}

		spinnerLoader.success(response[0]);
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		spinnerLoader.kill();
		goBackButton();
	}
};
