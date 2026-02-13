import { JsonFileManager } from "../lib/JsonFileManager";

export class ContactsRepository {
  constructor(private jsonFileManager: JsonFileManager) {
    this.jsonFileManager = new JsonFileManager();
  }

  getList() {
    return this.jsonFileManager.getAllRecords();
  }

  getByUsername(userName: string) {
    return this.jsonFileManager.getItemByKey(userName);
  }

  searchUsernames(userName: string) {
    return this.jsonFileManager.searchKeys(userName);
  }

  getByPhoneNumber(phone: string) {
    return this.jsonFileManager.getItemByValue(phone);
  }

  async updatePhone(username: string, phone: string) {
    return await this.jsonFileManager.updateRow(username, phone);
  }

  async removeByUsername(userName: string) {
    this.jsonFileManager.removeRow(userName);
  }

  addContract(key: string, value: string) {
    this.jsonFileManager.addRow(key, value);
  }
}
