import { generateContact } from './cli/commands/generateContact';
import { getContantByPhone } from './cli/commands/getContantByPhone';
import { getContantByUsername } from './cli/commands/getContantByUsername';
import { getContentsList } from './cli/commands/getContentsList';
import { removeContact } from './cli/commands/removeContact';
import { updateContact } from './cli/commands/updateContact';

export const COMMANDS = {
  'new-contact': generateContact,
  list: getContentsList,
  'get-by-username': getContantByUsername,
  'get-by-phone': getContantByPhone,
  remove: removeContact,
  update: updateContact,
};
