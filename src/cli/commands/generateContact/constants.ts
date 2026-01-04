import { CommandConstant } from '../../../types';

export const generateContactConstants: CommandConstant = {
  command: 'new-contact',
  description: 'Create a new user interactively',
  onLoadingMessage: 'Creating user...',
  onSuccessMessage: 'User created successfully',
};
