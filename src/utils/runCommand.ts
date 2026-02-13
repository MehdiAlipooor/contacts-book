import { COMMANDS } from "../constants";
import type { CliCommand } from "../types";
import { menu } from "../ui/menu";

export function runCommand(command: CliCommand) {
	return COMMANDS[command]?.() ?? menu();
}
