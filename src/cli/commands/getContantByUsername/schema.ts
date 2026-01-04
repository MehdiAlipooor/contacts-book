import { Schema } from '../../../types';
import { Validator } from '../../../utils/validator';

export const getContactByUsernameSchema: Schema[] = [
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
];
