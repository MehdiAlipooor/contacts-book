import { JsonDriver } from "@/lib/DbDriver";
import {
  type ContactEntity,
  NewRepository,
} from "@/repositories/newRepository";
import { goBackButton } from "@/ui/goBackButton";
import { handleError } from "@/utils/errorHandler";
import { getContactStoragePath } from "@/utils/getContactStoragePath";
import { SpinnerLoader } from "@/utils/spinnerLoader";

const spinnerLoader = new SpinnerLoader();
const dbRepo = new NewRepository(
  new JsonDriver<ContactEntity>(getContactStoragePath()),
);

export async function getContractListHandler() {
  spinnerLoader.show();

  try {
    const list = await dbRepo.findAll();

    console.table(
      (list ?? []).map((item) => {
        return {
          username: item.username,
          phone: item.phone,
        };
      }),
    );

    console.log("------------------------");

    spinnerLoader.success("Done");
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    goBackButton();
  }
}
