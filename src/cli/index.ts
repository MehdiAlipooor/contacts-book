import { program } from './program';

import { generateContact } from './commands/generateContact';
import { getContentsList } from './commands/getContentsList';
import { getContantByUsername } from './commands/getContantByUsername';
import { getContantByPhone } from './commands/getContantByPhone';
import { removeContact } from './commands/removeContact';
import { updateContact } from './commands/updateContact';

function baseCommands() {
  program.name('contact-phone').description('Contact Phone CLI').version('1.0.0');
  program.parse(process.argv);
}

export function bootstrapCli() {
  generateContact();
  getContentsList();
  getContantByUsername();
  getContantByPhone();
  removeContact();
  updateContact();
  baseCommands();
}
