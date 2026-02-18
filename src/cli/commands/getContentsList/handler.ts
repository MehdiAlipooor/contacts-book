import { contactsRepository } from "@/cli/container";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { SpinnerLoader } from "@/utils/spinnerLoader";

const spinnerLoader = new SpinnerLoader();

export async function getContractListHandler() {
	spinnerLoader.show();

	try {
		const list = await contactsRepository.findAll();

		console.log("");
		console.log("");

		console.table(
			(list ?? []).map((item) => {
				return {
					username: item.username,
					phone: item.phone,
				};
			}),
		);

		console.log("------------------------");

		spinnerLoader.success("Done");
	} catch (err) {
		handleError(err, spinnerLoader);
	} finally {
		goBackButton();
	}
}
