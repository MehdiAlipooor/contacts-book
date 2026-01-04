import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { wait } from '../../../utils/wait';
import { GetContactByPhoneHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const getContactByPhoneHandler: GetContactByPhoneHandler = async (phone: string) => {
  spinnerLoader.show();
  await wait();

  try {
    const response = orm.getByPhoneNumber(phone);
    if (!response || !response.length) {
      spinnerLoader.error('No contact found');
      return;
    }

    spinnerLoader.success(response[0]);
  } catch (err) {
    console.log(err);
  } finally {
    spinnerLoader.kill();
  }
};
