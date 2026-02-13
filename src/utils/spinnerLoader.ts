import chalk from "chalk";
import ora, { type Ora } from "ora";

export class SpinnerLoader {
	private spinnerInstance: Ora | null = null;

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
