import { createCliModule } from '../../lib/createCliModule';
import { menu } from '../menu';
import { goBackSchema } from './schema';

const prompts = goBackSchema();

export const goBackButton = () => {
  createCliModule({
    prompts,
    action: () => {
      menu();
    },
  });
};
