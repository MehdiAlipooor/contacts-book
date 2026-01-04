import inquirer from 'inquirer';

import { program } from '../../program';
import { getContantByPhoneSchema } from './schema';
import { getContantByPhoneConstants } from './constants';

program
  .command(getContantByPhoneConstants.command)
  .description(getContantByPhoneConstants.description)
  .action(async () => {
    const { phone } = await inquirer.prompt(getContantByPhoneSchema);
    await (await import('./handler')).getContactByPhoneHandler(phone);
  });
