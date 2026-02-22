import { join } from "node:path";

export const getContactStoragePath = () => {
  return join(__dirname, "./../storage/contacts.json");
};
