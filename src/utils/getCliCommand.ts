import type { CliCommand } from "@/types";

/**
 *
 * @description This function returns the command which is entered into terminal
 */
export const getCliCommand: () => CliCommand = () =>
	process.argv.slice(2)[0] as CliCommand;
