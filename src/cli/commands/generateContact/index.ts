import { generateContactSchema } from './schema';
import { generateContractHandler } from './handler';
import { createCliModule } from '../../../lib/createCliModule';
import { menu } from '../menu';

async function action(response: Record<string, string>) {
  const { username, phone } = response;
  await generateContractHandler({ username, phone });

  menu();
}

const prompts = generateContactSchema();

export const generateContact = () =>
  createCliModule({
    prompts,
    action,
  });
