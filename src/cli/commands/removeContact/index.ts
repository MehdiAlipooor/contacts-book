import inquirer from 'inquirer';

import { program } from '../../program';
import { removeContactConstants } from './constants';
import { removeContactSchema } from './schema';

program
  .command(removeContactConstants.command)
  .description(removeContactConstants.description)
  .action(async () => {
    const { username } = await inquirer.prompt(removeContactSchema);
    await (await import('./handler')).removeContactHandler(username);
  });
