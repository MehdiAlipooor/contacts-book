import { generateContactSchema } from './schema';
import { generateContactConstants } from './constants';
import { generateContractHandler } from './handler';
import { createCliModule } from '../../../utils/createCliModule';

export const generateContact = () =>
  createCliModule({
    command: generateContactConstants.command,
    description: generateContactConstants.description,
    action: generateContractHandler,
    schema: generateContactSchema,
  });
