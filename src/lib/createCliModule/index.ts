import { handleError } from "@/utils/errorHandler";
import { executePrompt } from "./executePrompts";
import type { CliModuleConfig } from "./types";

export const createCliModule = async (
  config: CliModuleConfig,
): Promise<void> => {
  const answers: Record<string, string> = {};

  for (const prompt of config.prompts) {
    try {
      const { key, value } = (await executePrompt(prompt)) as {
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
