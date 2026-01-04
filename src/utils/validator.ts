export class Validator {
  private input = '';
  private errors: string[] = [];

  constructor(input: string) {
    this.input = input;
  }

  isEmpty() {
    if (!this.input) {
      this.errors.push('Input is required');
    }

    return this;
  }

  isValidUsername() {
    if (!/^[a-zA-Z0-9_]+$/.test(this.input)) {
      this.errors.push('Username is not valid');
    }

    return this;
  }

  isValidMobile() {
    if (!/^(?:\+98|0)?9\d{9}$/.test(this.input)) {
      this.errors.push('Phone is not valid');
    }

    return this;
  }

  getError() {
    return this.errors[0];
  }

  isValid() {
    return this.errors?.length ? false : true;
  }
}
