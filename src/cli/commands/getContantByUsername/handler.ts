import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { wait } from '../../../utils/wait';
import { GetContactByUsernameHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const getContactByUsernameHandler: GetContactByUsernameHandler = async (username) => {
  spinnerLoader.show();

  await wait();

  try {
    const response = orm.getByUsername(username);
    if (!response) {
      spinnerLoader.error('No contact found');
      return;
    }

    spinnerLoader.success(response);
  } catch (err) {
    console.log(err);
  } finally {
    spinnerLoader.kill();
  }
};
