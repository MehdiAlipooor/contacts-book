import { JsonFileManager } from '../../../../lib/JsonFileManager';
import { ORM } from '../../../../lib/ORM';

const jsonFileManager = new JsonFileManager();
const orm = new ORM(jsonFileManager);

export const searchUsernameHandler = async (username: string) => {
  const response = await orm.searchUsernames(username);

  return response.map((item) => {
    return {
      description: item.key,
      name: item.key,
      value: item.key,
    };
  });
};
