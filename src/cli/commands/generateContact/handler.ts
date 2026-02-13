import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ORM } from "../../../lib/ORM";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import type { GenerateContractHandler } from "./types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const generateContractHandler: GenerateContractHandler = async ({
	username,
	phone,
}) => {
	try {
		spinnerLoader.show();
		orm.addContract(username, phone);
		spinnerLoader.success("Created successfully");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
};
