import { createCliModule } from "@/lib/createCliModule";
import { removeContactHandler } from "./handler";
import { removeContactSchema } from "./schema";

async function action(response: Record<string, string>) {
  await removeContactHandler({ username: response.username });
}

const prompts = removeContactSchema();

export const removeContact = () =>
  createCliModule({
    prompts,
    action,
  });
