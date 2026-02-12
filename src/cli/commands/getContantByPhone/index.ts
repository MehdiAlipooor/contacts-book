import { getContantByPhoneSchema } from './schema';
import { getContactByPhoneHandler } from './handler';
import { createCliModule } from '../../../lib/createCliModule';

async function action(response: Record<string, string>) {
  await getContactByPhoneHandler({ phone: response.phone });
}

const prompts = getContantByPhoneSchema();

export const getContantByPhone = () =>
  createCliModule({
    prompts,
    action,
  });
