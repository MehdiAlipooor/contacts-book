import inquirer from 'inquirer';

import { generateContactSchema } from './schema';
import { generateContactConstants } from './constants';
import { generateContractHandler } from './handler';
import { program } from '../../program';

program
  .command(generateContactConstants.command)
  .description(generateContactConstants.description)
  .action(async () => {
    const { username, phone } = await inquirer.prompt(generateContactSchema);
    generateContractHandler(username, phone);

    (await import('./handler')).generateContractHandler(username, phone);
  });
