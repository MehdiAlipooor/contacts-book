import { getCliCommand } from '../utils/getCliCommand';
import { runCommand } from '../utils/runCommand';

export function bootstrapCli() {
  runCommand(getCliCommand());
}
