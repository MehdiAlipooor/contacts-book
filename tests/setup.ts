import { jest } from "@jest/globals";

/**
 * @default 5000
 * @description Maybe a test was longer(like async operations)
 */
jest.setTimeout(10000);

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});
