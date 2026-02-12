import { PromptDefinition } from '../../../lib/createCliModule/types';

export const menuSchama: () => PromptDefinition[] = () => {
  return [
    {
      type: 'select',
      key: 'command',
      message: 'Command:',
      choices: [
        {
          name: 'New Contact',
          value: 'new-contact',
        },
        {
          name: 'List',
          value: 'list',
        },
        {
          value: 'get-by-username',
          name: 'Get contact by username',
        },
        {
          value: 'get-by-phone',
          name: 'Get contact by phone',
        },
        {
          value: 'remove',
          name: 'Remove contact',
        },
        {
          value: 'update',
          name: 'Update contact',
        },
      ],
    },
  ];
};
