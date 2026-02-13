import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { getContactStoragePath } from "../../../utils/getContactStoragePath";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import type { RemoveContactHandler } from "./types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager(getContactStoragePath());
const repository = new ContactsRepository(jsonFileManager);

export const removeContactHandler: RemoveContactHandler = async ({
  username,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    repository.delete(username);
    spinnerLoader.success("Contact removed");
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    goBackButton();
  }
};
