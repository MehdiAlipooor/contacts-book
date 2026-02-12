import { PromptDefinition } from '../../lib/createCliModule/types';

export const goBackSchema: () => PromptDefinition[] = () => [
  {
    type: 'select',
    key: 'command',
    message: '____________________________________',
    choices: [
      {
        name: 'Go back to home',
        value: 'go-back',
      },
    ],
  },
];
