export interface JsonData {
  [key: string]: string;
}

export type Schema = {
  type: string;
  name: string;
  message: string;
  validate?: (input: string) => string | boolean;
};

export interface CommandConstant {
  command: string;
  description: string;
  [key: string]: string;
}
