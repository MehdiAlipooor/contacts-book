import { updateContactSchema } from './schema';
import { updateContacHandler } from './handler';
import { createCliModule } from '../../../lib/createCliModule';

async function action(response: Record<string, string>) {
  const { username, phone } = response;
  await updateContacHandler({ username, phone });
}

const prompts = updateContactSchema();

export const updateContact = () =>
  createCliModule({
    prompts,
    action,
  });
