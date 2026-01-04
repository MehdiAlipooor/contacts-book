export interface JsonData {
  [key: string]: string;
}

export type Schema = {
  type: string;
  name: string;
  message: string;
  validate?: (input: string) => string | boolean;
};
