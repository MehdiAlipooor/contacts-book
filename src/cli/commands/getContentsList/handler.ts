import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ORM } from "../../../lib/ORM";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export async function getContractListHandler() {
	spinnerLoader.show();
	await wait();
	try {
		const list = await orm.getList();
		console.table(list);
		spinnerLoader.success("Done");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
}
