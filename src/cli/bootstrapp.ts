import { jsonFileManager } from "@/cli/container";
import { getContactStoragePath } from "@/utils/getContactStoragePath";

export async function bootstrapp() {
  jsonFileManager.connect(getContactStoragePath());

  jsonFileManager.on("connect", () => {
    console.log("Connected");
  });

  jsonFileManager.on("error", () => {
    throw new Error("Error");
  });
}
