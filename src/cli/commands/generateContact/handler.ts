import { DuplicatedException } from "../../../lib/Exceptions";
import { goBackButton } from "../../../ui/goBackButton";
import { handleError } from "../../../utils/errorHandler";
import { SpinnerLoader } from "../../../utils/spinnerLoader";
import { contactsRepository } from "../../container";
import type { GenerateContractHandler } from "./types";

const spinnerLoader = new SpinnerLoader();

export const generateContractHandler: GenerateContractHandler = async ({
  username,
  phone,
}) => {
  try {
    spinnerLoader.show();
    const existsByPhone = await contactsRepository.findByPhone(phone);
    const existsByUsername = await contactsRepository.findByUsername(username);

    if (existsByPhone?.length || existsByUsername) {
      throw new DuplicatedException("Item exists");
    }

    contactsRepository.save({ username, phone });
    spinnerLoader.success("Created successfully");
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    goBackButton();
  }
};
