import { JsonFileManager } from "../../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../../repositories/ContactsRepository";
import { goBackButton } from "../../../../ui/goBackButton";
import { handleError } from "../../../../utils/errorHandler";
import { SpinnerLoader } from "../../../../utils/spinnerLoader";
import { wait } from "../../../../utils/wait";
import type { GetContactByUsernameHandler } from "../types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const repository = new ContactsRepository(jsonFileManager);

export const getContactByUsernameHandler: GetContactByUsernameHandler = async ({
  username,
}) => {
  spinnerLoader.show();

  await wait();

  try {
    const response = await repository.findByUsername(username);
    if (!response) {
      spinnerLoader.error("No contact found");
      return;
    }

    spinnerLoader.success(`${response.username}: ${response.phone}`);
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    spinnerLoader.kill();
    goBackButton();
  }
};
