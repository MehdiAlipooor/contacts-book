import { dbDriver } from "@/cli/container";
import { getContactStoragePath } from "@/utils/getContactStoragePath";

export async function bootstrapp(onConnect: () => void) {
  dbDriver.connect(getContactStoragePath());

  dbDriver.on("connect", () => {
    console.log("Connected");
    onConnect();
  });

  dbDriver.on("error", () => {
    process.exit(0);
  });
}
