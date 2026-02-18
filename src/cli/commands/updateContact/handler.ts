import { contactsRepository } from "@/cli/container";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { SpinnerLoader } from "@/utils/spinnerLoader";
import { wait } from "@/utils/wait";

export type RemoveContactHandler = ({
  username,
  phone,
}: {
  username: string;
  phone: string;
}) => Promise<void>;

const spinnerLoader = new SpinnerLoader();

export const updateContacHandler: RemoveContactHandler = async ({
  username,
  phone,
}) => {
  spinnerLoader.show();
  await wait();

  try {
    const user = await contactsRepository.findByUsername(username);
    if (!user) {
      spinnerLoader.error("No user exists with for username");
      return;
    }

    await contactsRepository.update(user.id, { username, phone });
    spinnerLoader.success("Contact updated");
  } catch (err) {
    handleError(err, spinnerLoader);
    spinnerLoader.error("Contact update failed");
  } finally {
    goBackButton();
  }
};
