import { createCliModule } from '../../../utils/createCliModule';
import { program } from '../../program';
import { getContactListConstants } from './constants';
import { getContractListHandler } from './handler';

export const getContentsList = () =>
  createCliModule({
    command: getContactListConstants.command,
    description: getContactListConstants.description,
    action: getContractListHandler,
  });
