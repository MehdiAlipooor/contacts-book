import { PromptDefinition } from '../../../lib/createCliModule/types';
import { Schema } from '../../../types';
import { Validator } from '../../../utils/validator';

export const generateContactSchema: () => PromptDefinition[] = () => [
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
  {
    type: 'input',
    key: 'phone',
    message: 'Phone number:',
    validator: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isEmpty().isValidMobile().getError();

      return error ?? true;
    },
  },
];
