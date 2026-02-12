import { PromptDefinition } from '../../../lib/createCliModule/types';
import { Validator } from '../../../utils/validator';

export const removeContactSchema: () => PromptDefinition[] = () => [
  {
    type: 'input',
    key: 'username',
    message: 'Username:',
    validator: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isEmpty().getError();

      return error ?? true;
    },
  },
];
