import { createCliModule } from "@/lib/createCliModule";
import type { CliCommand } from "@/types";
import { runCommand } from "@/utils/runCommand";
import { menuSchama } from "./schema";

const prompts = menuSchama();

async function action(response: Record<string, string>) {
	runCommand(response.command as CliCommand);
}

export const menu = () =>
	createCliModule({
		prompts,
		action,
	});
