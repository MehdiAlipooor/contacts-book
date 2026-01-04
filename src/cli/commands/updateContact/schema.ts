import { Schema } from '../../../types';
import { Validator } from '../../../utils/validator';

export const updateContactSchema: Schema[] = [
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
    message: 'New phone:',
    validate: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isValidMobile().getError();

      return error ?? true;
    },
  },
];
