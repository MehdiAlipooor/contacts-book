import { DuplicatedException } from '../../../lib/Exceptions';
import { JsonFileManager } from '../../../lib/JsonFileManager';
import { ORM } from '../../../lib/ORM';
import { handleError } from '../../../utils/errorHandler';
import { SpinnerLoader } from '../../../utils/spinnerLoader';
import { generateContactConstants } from './constants';
import { GenerateContractHandler } from './types';

const spinnerLoader = new SpinnerLoader();
const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const generateContractHandler: GenerateContractHandler = async ({ username, phone }) => {
  try {
    spinnerLoader.show();
    orm.addContract(username, phone);
    spinnerLoader.success(generateContactConstants.onSuccessMessage);
  } catch (err) {
    handleError(err, spinnerLoader);
  }
};
