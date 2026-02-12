import { getContantByPhoneSchema } from './schema';
import { getContantByPhoneConstants } from './constants';
import { createCliModule } from '../../../utils/createCliModule';
import { getContactByPhoneHandler } from './handler';

export const getContantByPhone = () =>
  createCliModule({
    command: getContantByPhoneConstants.command,
    description: getContantByPhoneConstants.description,
    action: getContactByPhoneHandler,
    schema: getContantByPhoneSchema,
  });
