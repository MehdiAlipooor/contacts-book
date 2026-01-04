import inquirer from 'inquirer';

import { program } from '../../program';
import { getContactByUsernameSchema } from './schema';
import { getContactByUsernameConstants } from './constants';

program
  .command(getContactByUsernameConstants.command)
  .description(getContactByUsernameConstants.description)
  .action(async () => {
    const { username } = await inquirer.prompt(getContactByUsernameSchema);
    await (await import('./handler')).getContactByUsernameHandler(username);
  });
