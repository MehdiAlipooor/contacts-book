import { contactsRepository } from "@/cli/container";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { SpinnerLoader } from "@/utils/spinnerLoader";
import { wait } from "@/utils/wait";

const spinnerLoader = new SpinnerLoader();

export type RemoveContactHandler = ({
	username,
}: {
	username: string;
}) => Promise<void>;

export const removeContactHandler: RemoveContactHandler = async ({
	username,
}) => {
	spinnerLoader.show();
	await wait();

	try {
		contactsRepository.delete(username);
		spinnerLoader.success("Contact removed");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
};
