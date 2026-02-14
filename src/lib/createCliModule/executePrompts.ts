import { ExitPromptException } from "../Exceptions";
import { commands } from "./commands";
import type { PromptDefinition } from "./types";

export async function executePrompt(
	prompt: PromptDefinition,
): Promise<{ key: string; value: string } | undefined> {
	const { type, key } = prompt;

	if (type === "input") {
		const { message, validator, theme } = prompt;
		const value = await commands.input({ message, validator, theme });
		return { key, value };
	}

	if (type === "select") {
		const { message, choices } = prompt;
		const value = await commands.select({ message, choices });
		return { key, value };
	}

	if (type === "search") {
		const { message, onSearch } = prompt;
		const value = await commands.search({ message, onSearch });
		return { key, value };
	}

	throw new ExitPromptException("No prompt");
}
