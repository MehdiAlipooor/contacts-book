export abstract class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    /**
     * @description For better stack tracing
     */
    Error.captureStackTrace(this, this.constructor);
  }

  toJson() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
    };
  }

  getMessage() {
    return this.message;
  }
}

export class DuplicatedException extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "DuplicatedException";
  }
}

export class SavingFileException extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "SavingFileException";
  }
}

export class NoItemException extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "NoItemExeption";
  }
}

export class ExitPromptException extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "ExitPromptException";
  }
}

export class NoRecordExists extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "NoRecordExists";
  }
}

export class WrongFormatException extends AppError {
  constructor(message: string) {
    super(message);
    this.name = "WrongFormatException";
  }
}
