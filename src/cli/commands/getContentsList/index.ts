import { program } from '../../program';
import { getContactListConstants } from './constants';

program
  .command(getContactListConstants.command)
  .description(getContactListConstants.description)
  .action(async () => {
    (await import('./handler')).getContractListHandler();
  });
