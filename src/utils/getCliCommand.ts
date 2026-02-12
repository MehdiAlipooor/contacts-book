import { CliCommand } from '../types';

export const getCliCommand: () => CliCommand = () => process.argv.slice(2)[0] as CliCommand;
