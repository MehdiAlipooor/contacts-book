import { Schema } from '../../../types';
import { Validator } from '../../../utils/validator';

export const generateContactSchema: Schema[] = [
  {
    type: 'input',
    name: 'username',
    message: 'Username:',
    validate: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isEmpty().getError();

      return error ?? true;
    },
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Phone number:',
    validate: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isEmpty().isValidMobile().getError();

      return error ?? true;
    },
  },
];
