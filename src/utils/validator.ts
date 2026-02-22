export class Validator {
	private errors: string[] = [];

	constructor(private input: string) {}

	isEmpty() {
		if (!this.input) {
			this.errors.push("Input is required");
		}

		return this;
	}

	isMobile() {
		if (!/^(?:\+98|0)?9\d{9}$/.test(this.input)) {
			this.errors.push("Phone is not valid");
		}

		return this;
	}

	getError() {
		return this.errors[0];
	}

	isValid() {
		return !this.errors?.length;
	}
}
