import { NoItemException } from '../../../lib/Exceptions';
import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { goBackButton } from '../../../ui/goBackButton';
import { handleError } from '../../../utils/errorHandler';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { wait } from '../../../utils/wait';
import { RemoveContactHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const removeContactHandler: RemoveContactHandler = async ({ username }) => {
  spinnerLoader.show();
  await wait();

  try {
    orm.removeByUsername(username);
    spinnerLoader.success('Contact removed');
  } catch (err) {
    handleError(err, spinnerLoader);
  } finally {
    goBackButton();
  }
};
