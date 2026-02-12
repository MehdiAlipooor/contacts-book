import { NoItemException } from '../../../lib/Exceptions';
import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { handleError } from '../../../utils/errorHandler';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { wait } from '../../../utils/wait';
import { RemoveContactHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const updateContacHandler: RemoveContactHandler = async ({ username, phone }) => {
  spinnerLoader.show();
  await wait();

  try {
    orm.updatePhone(username, phone);
    spinnerLoader.success('Contact updated');
  } catch (err) {
    handleError(err, spinnerLoader);
    spinnerLoader.error('Contact update failed');
  }
};
