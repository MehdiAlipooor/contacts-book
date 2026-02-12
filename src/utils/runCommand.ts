import { menu } from '../cli/commands/menu';
import { COMMANDS } from '../constants';
import { CliCommand } from '../types';

export function runCommand(command: CliCommand) {
  return COMMANDS[command]?.() ?? menu();
}
