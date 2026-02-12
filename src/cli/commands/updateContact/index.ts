import { updateContactConstants } from './constants';
import { updateContactSchema } from './schema';
import { createCliModule } from '../../../utils/createCliModule';
import { updateContacHandler } from './handler';

export const updateContact = () =>
  createCliModule({
    command: updateContactConstants.command,
    description: updateContactConstants.description,
    action: updateContacHandler,
    schema: updateContactSchema,
  });
