import { handleError } from "../../utils/errorHandler";
import { ExitPromptException } from "../Exceptions";
import { commands } from "./commands";
import type { CliModuleConfig, PromptDefinition } from "./types";

async function executePrompt(
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

  console.log("user got out");
}

export const createCliModule = async (
  config: CliModuleConfig,
): Promise<void> => {
  const answers: Record<string, string> = {};

  for (const prompt of config.prompts) {
    try {
      const response = await executePrompt(prompt);
      if (!response) {
        throw new ExitPromptException("No prompt");
      }
      const { key, value } = response as {
        key: string;
        value: string;
      };
      answers[key] = value;
    } catch (error) {
      handleError(error);
      process.exit(0);
    }
  }

  await config.action(answers);
};
