import { contactsRepository } from "@/cli/container";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { SpinnerLoader } from "@/utils/spinnerLoader";

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

	try {
		const response = await contactsRepository.search(username);
		if (!response) {
			spinnerLoader.error("No contact found");
			return;
		}

		contactsRepository.delete(response?.[0]?.id);
		spinnerLoader.success("Contact removed");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
};
