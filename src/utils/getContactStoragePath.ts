import { getFilePathFromRoot } from "./getFilePathFromRoot";

export const getContactStoragePath = () => {
	return getFilePathFromRoot("./../storage/contacts.json");
};
