import {
  AppError,
  DuplicatedException,
  ExitPromptException,
  NoItemException,
  NoRecordExists,
  SavingFileException,
  WrongFormatException,
} from "@/lib/Exceptions";
import type { SpinnerLoader } from "./spinnerLoader";

export const handleError = (error: unknown, spinner?: SpinnerLoader): void => {
  const message = error instanceof Error ? error.message : String(error);

  const errorUi = spinner ? spinner : console;

  if (error instanceof DuplicatedException) {
    errorUi?.error(`DuplicatedException: ${message}`);
  } else if (error instanceof NoItemException) {
    errorUi?.error(`NoItemException: ${message}`);
  } else if (error instanceof SavingFileException) {
    errorUi?.error(`SavingFileException: ${message}`);
  } else if (error instanceof ExitPromptException) {
    errorUi?.error(`ExitPromptException: ${message}`);
  } else if (error instanceof AppError) {
    errorUi?.error(`AppError: ${message}`);
  } else if (error instanceof NoRecordExists) {
    errorUi?.error(`Item already exists: ${message}`);
  } else if (error instanceof WrongFormatException) {
    errorUi?.error(`Storage should be array: ${message}`);
  } else {
    errorUi?.error(`Default: ${message}`);
  }
};
