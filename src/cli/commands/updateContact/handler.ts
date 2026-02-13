import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { wait } from "../../../utils/wait";
import { contactsRepository } from "../../container";
import type { RemoveContactHandler } from "./types";

const spinnerLoader = new SpinnerLoader();

export const updateContacHandler: RemoveContactHandler = async ({
  username,
  phone,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    await contactsRepository.save({ username, phone });
    spinnerLoader.success("Contact updated");
  } catch (err) {
    handleError(err, spinnerLoader);
    spinnerLoader.error("Contact update failed");
  } finally {
    goBackButton();
  }
};
