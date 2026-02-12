import { searchUsernameHandler } from './handlers/searchUsername';
import { getContactByUsernameHandler } from './handlers/getContactByUsername';
import { createCliModule } from '../../../lib/createCliModule';
import { getContactByUsernameSchema } from './schema';

async function onSearch(username: string) {
  return await searchUsernameHandler(username);
}

async function action(response: Record<string, string>) {
  const { username } = response;
  return await getContactByUsernameHandler({ username });
}

const prompts = getContactByUsernameSchema({ onSearch });

export const getContantByUsername = () =>
  createCliModule({
    prompts,
    action,
  });
