import { createCliModule } from '../../../utils/createCliModule';
import { getContactListConstants } from './constants';
import { getContractListHandler } from './handler';

export const getContentsList = () =>
  createCliModule({
    command: getContactListConstants.command,
    description: getContactListConstants.description,
    action: getContractListHandler,
  });
