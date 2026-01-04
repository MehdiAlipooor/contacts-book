import inquirer from 'inquirer';

import { program } from '../../program';
import { updateContactConstants } from './constants';
import { updateContactSchema } from './schema';

program
  .command(updateContactConstants.command)
  .description(updateContactConstants.description)
  .action(async () => {
    const { username, phone } = await inquirer.prompt(updateContactSchema);
    await (await import('./handler')).updateContacHandler(username, phone);
  });
