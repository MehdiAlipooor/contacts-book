import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import { contactsRepository } from "../../container";
import type { GetContactByPhoneHandler } from "./types";

const spinnerLoader = new SpinnerLoader();

export const getContactByPhoneHandler: GetContactByPhoneHandler = async ({
  phone,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    const response = await contactsRepository.findByPhone(phone);
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
