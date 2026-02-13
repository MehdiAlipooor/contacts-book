import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const repository = new ContactsRepository(jsonFileManager);

export async function getContractListHandler() {
	spinnerLoader.show();
	await wait();
	try {
		const list = await repository.getList();
		console.table(list);
		spinnerLoader.success("Done");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
}
