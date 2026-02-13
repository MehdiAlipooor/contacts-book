import chalk from "chalk";
import ora, { type Ora } from "ora";

export class SpinnerLoader {
  private spinnerInstance: Ora | null = null;

  show() {
    this.spinnerInstance = ora().start();
  }

  // biome-ignore lint/suspicious/noExplicitAny: <message could be anything>
  success(message?: any) {
    this.spinnerInstance?.succeed(chalk.green(message));
    this.spinnerInstance?.stop();
  }

  error(message?: string) {
    this.spinnerInstance?.fail(chalk.red(message));
    this.spinnerInstance?.stop();
  }

  kill() {
    this.spinnerInstance?.stop();
  }
}
