import { getContactByUsernameSchema } from './schema';
import { getContactByUsernameConstants } from './constants';
import { createCliModule } from '../../../utils/createCliModule';
import { getContactByUsernameHandler } from './handler';

export const getContantByUsername = () =>
  createCliModule({
    command: getContactByUsernameConstants.command,
    description: getContactByUsernameConstants.description,
    action: getContactByUsernameHandler,
    schema: getContactByUsernameSchema,
  });
