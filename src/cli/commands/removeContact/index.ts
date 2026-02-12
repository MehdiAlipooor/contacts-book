import { removeContactSchema } from './schema';
import { removeContactHandler } from './handler';
import { createCliModule } from '../../../lib/createCliModule';

async function action(response: Record<string, string>) {
  await removeContactHandler({ username: response.username });
}
const prompts = removeContactSchema();

export const removeContact = () =>
  createCliModule({
    prompts,
    action,
  });
