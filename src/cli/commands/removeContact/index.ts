import { removeContactConstants } from './constants';
import { removeContactSchema } from './schema';
import { createCliModule } from '../../../utils/createCliModule';
import { removeContactHandler } from './handler';

export const removeContact = () =>
  createCliModule({
    command: removeContactConstants.command,
    description: removeContactConstants.description,
    action: removeContactHandler,
    schema: removeContactSchema,
  });
