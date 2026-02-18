import { contactsRepository } from "@/cli/container";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { SpinnerLoader } from "@/utils/spinnerLoader";
import { wait } from "@/utils/wait";

export type GetContactByUsernameHandler = ({
  username,
}: {
  username: string;
}) => Promise<void>;

const spinnerLoader = new SpinnerLoader();

export const getContactByUsernameHandler: GetContactByUsernameHandler = async ({
  username,
}) => {
  spinnerLoader.show();

  await wait();

  try {
    const response = await contactsRepository.search(username);
    if (!response) {
      spinnerLoader.error("No contact found");
      return;
    }

    spinnerLoader.success(
      `${response?.[0]?.username}: ${response?.[0]?.phone}`,
    );
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    spinnerLoader.kill();
    goBackButton();
  }
};
