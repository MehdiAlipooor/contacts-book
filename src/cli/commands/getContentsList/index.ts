import { createCliModule } from '../../../lib/createCliModule';
import { getContractListHandler } from './handler';

export const getContentsList = () =>
  createCliModule({
    prompts: [],
    action: getContractListHandler,
  });
