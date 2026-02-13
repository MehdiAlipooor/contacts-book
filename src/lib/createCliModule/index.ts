import { handleError } from "../../utils/errorHandler";
import { ExitPromptException } from "../Exceptions";
import { executePrompt } from "./executePrompts";
import type { CliModuleConfig } from "./types";

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
