import ora, { Ora } from 'ora';
import chalk from 'chalk';

export class SpinnerLoader {
  private spinnerInstance: Ora | null = null;

  constructor() {}

  show() {
    this.spinnerInstance = ora().start();
  }

  success(successMessage?: string) {
    this.spinnerInstance?.succeed(chalk.green(successMessage));
    this.spinnerInstance?.stop();
  }

  error(errorMessage?: string) {
    this.spinnerInstance?.fail(chalk.red(errorMessage));
    this.spinnerInstance?.stop();
  }

  kill() {
    this.spinnerInstance?.stop();
  }
}
