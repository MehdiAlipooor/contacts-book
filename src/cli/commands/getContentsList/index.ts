import { program } from '../../program';
import { getContactListConstants } from './constants';

export const getContentsList = () =>
  program
    .command(getContactListConstants.command)
    .description(getContactListConstants.description)
    .action(async () => {
      (await import('./handler')).getContractListHandler();
    });
