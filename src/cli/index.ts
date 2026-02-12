import { generateContact } from './commands/generateContact';
import { getContentsList } from './commands/getContentsList';
import { getContantByPhone } from './commands/getContantByPhone';
import { removeContact } from './commands/removeContact';
import { updateContact } from './commands/updateContact';
import { getContantByUsername } from './commands/getContantByUsername';

const COMMANDS = {
  'new-contact': generateContact,
  list: getContentsList,
  'get-by-username': getContantByUsername,
  'get-by-phone': getContantByPhone,
  remove: removeContact,
  update: updateContact,
};

type CliCommand = keyof typeof COMMANDS;

const cliCommand = process.argv.slice(2)[0] as CliCommand;

function runCommand(command: CliCommand) {
  return COMMANDS[command]();
}

export function bootstrapCli() {
  runCommand(cliCommand);
}
