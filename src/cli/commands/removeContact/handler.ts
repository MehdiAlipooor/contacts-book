import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import { contactsRepository } from "../../container";
import type { RemoveContactHandler } from "./types";

const spinnerLoader = new SpinnerLoader();

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
