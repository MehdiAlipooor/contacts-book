import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import { contactsRepository } from "../../container";

const spinnerLoader = new SpinnerLoader();

export async function getContractListHandler() {
  spinnerLoader.show();
  await wait();
  try {
    const list = await contactsRepository.findAll();
    console.table(list);
    spinnerLoader.success("Done");
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    goBackButton();
  }
}
