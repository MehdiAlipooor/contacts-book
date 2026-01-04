export class DuplicatedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicatedException';
  }
}

export class SavingFileException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SavingFileException';
  }
}

export class NoItemExeption extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NoItemExeption';
  }
}
