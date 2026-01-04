import { DuplicatedException } from '../../../lib/Exceptions';
import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { generateContactConstants } from './constants';
import { GenerateContractHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const generateContractHandler: GenerateContractHandler = async (username, phone) => {
  try {
    spinnerLoader.show();
    orm.addContract(username, phone);
    spinnerLoader.success(generateContactConstants.onSuccessMessage);
  } catch (err) {
    if (err instanceof DuplicatedException) {
      spinnerLoader.error(err?.message);
    }

    spinnerLoader.error('Error');
  }
};
