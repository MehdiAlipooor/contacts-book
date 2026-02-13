import { JsonFileManager } from "../../../lib/JsonFileManager";
import { ContactsRepository } from "../../../repositories/ContactsRepository";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { getContactStoragePath } from "../../../utils/getContactStoragePath";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import type { GetContactByPhoneHandler } from "./types";

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager(getContactStoragePath());
const repository = new ContactsRepository(jsonFileManager);

export const getContactByPhoneHandler: GetContactByPhoneHandler = async ({
  phone,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    const response = await repository.findByPhone(phone);
    if (!response) {
      spinnerLoader.error("No contact found");
      return;
    }

    spinnerLoader.success(`${response[0].username}:${response[0].phone}`);
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    spinnerLoader.kill();
    goBackButton();
  }
};
