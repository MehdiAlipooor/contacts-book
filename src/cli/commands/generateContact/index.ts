import { generateContactSchema } from './schema';
import { generateContractHandler } from './handler';
import { createCliModule } from '../../../lib/createCliModule';
import { menu } from '../../../ui/menu';

async function action(response: Record<string, string>) {
  const { username, phone } = response;
  await generateContractHandler({ username, phone });
}

const prompts = generateContactSchema();

export const generateContact = () =>
  createCliModule({
    prompts,
    action,
  });
