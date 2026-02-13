import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import type { RemoveContactHandler } from "./types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const repository = new ContactsRepository(jsonFileManager);

export const updateContacHandler: RemoveContactHandler = async ({
  username,
  phone,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    await repository.updatePhone(username, phone);
    spinnerLoader.success("Contact updated");
  } catch (err) {
    handleError(err, spinnerLoader);
    spinnerLoader.error("Contact update failed");
  } finally {
    goBackButton();
  }
};
