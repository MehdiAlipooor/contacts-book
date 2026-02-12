import { generateContact } from './commands/generateContact';
import { getContentsList } from './commands/getContentsList';
import { getContantByPhone } from './commands/getContantByPhone';
import { removeContact } from './commands/removeContact';
import { updateContact } from './commands/updateContact';
import { getContantByUsername } from './commands/getContantByUsername';

async function baseCommands() {}

const args = process.argv.slice(2)[0];

export function bootstrapCli() {
  if (args === 'new-contact') {
    generateContact();
  }
  if (args === 'list') {
    getContentsList();
  }
  if (args === 'get-by-username') {
    getContantByUsername();
  }
  if (args === 'get-by-phone') {
    getContantByPhone();
  }
  if (args === 'remove') {
    removeContact();
  }
  if (args === 'update') {
    updateContact();
  }
}
