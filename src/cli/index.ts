import { program } from './program';

import './commands/generateContact';
import './commands/getContentsList';
import './commands/getContantByUsername';
import './commands/getContantByPhone';
import './commands/removeContact';

program.name('contact-phone').description('Contact Phone CLI').version('1.0.0');

program.parse(process.argv);
