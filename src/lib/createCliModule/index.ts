import { commands } from './commands';
import { PromptDefinition, CliModuleConfig } from './types';

async function executePrompt(
  prompt: PromptDefinition,
): Promise<{ key: string; value: any }> | never {
  const { type, key } = prompt;

  if (type === 'input') {
    const { message, validator, theme } = prompt;
    const value = await commands.input({ message, validator, theme });
    return { key, value };
  }

  if (type === 'select') {
    const { message, choices } = prompt;
    const value = await commands.select({ message, choices });
    return { key, value };
  }

  if (type === 'search') {
    const { message, onSearch } = prompt;
    const value = await commands.search({ message, onSearch });
    return { key, value };
  }

  throw new Error(`Unknown prompt type: ${(prompt as any).type}`);
}

export const createCliModule = async (config: CliModuleConfig): Promise<void> => {
  const answers: Record<string, any> = {};

  for (const prompt of config.prompts) {
    try {
      const { key, value } = await executePrompt(prompt);
      answers[key] = value;
    } catch (error) {
      if (error instanceof Error && error.name === 'ExitPromptError') {
        console.log('Cancelled');
        return;
      }
      throw error;
    }
  }

  await config.action(answers);
};
