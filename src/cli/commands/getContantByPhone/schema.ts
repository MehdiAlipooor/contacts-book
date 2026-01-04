import { Schema } from '../../../types';
import { Validator } from '../../../utils/validator';

export const getContantByPhoneSchema: Schema[] = [
  {
    type: 'input',
    name: 'phone',
    message: 'Phone:',
    validate: (value: string) => {
      const validator = new Validator(value);
      const error = validator.isEmpty().isValidMobile().getError();

      return error ?? true;
    },
  },
];
