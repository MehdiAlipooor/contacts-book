import { JsonFileManager } from './JsonFileManager';

export class ORM {
  constructor(private jsonFileManager: JsonFileManager) {
    this.jsonFileManager = new JsonFileManager();
  }

  getList() {
    return this.jsonFileManager.getAllRecords();
  }

  getByUsername(userName: string) {
    return this.jsonFileManager.getItemByKey(userName);
  }

  getByPhoneNumber(phone: string) {
    return this.jsonFileManager.getItemByValue(phone);
  }

  updatePhone(username: string, phone: string) {
    return this.jsonFileManager.updateRow(username, phone);
  }

  removeByUsername(userName: string) {
    this.jsonFileManager.removeRow(userName);
  }

  addContract(key: string, value: string) {
    this.jsonFileManager.addRow(key, value);
  }
}
