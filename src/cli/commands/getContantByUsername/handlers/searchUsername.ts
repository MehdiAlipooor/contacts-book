import { contactsRepository } from "../../../container";

export const searchUsernameHandler = async (username: string) => {
  const response = await contactsRepository.search(username);

  return response.map((item) => {
    return {
      description: item.username,
      name: item.username,
      value: item.username,
    };
  });
};
