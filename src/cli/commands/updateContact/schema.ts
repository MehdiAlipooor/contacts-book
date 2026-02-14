import type { PromptDefinition } from "../../../lib/createCliModule/types";
import { Validator } from "../../../utils/validator";

export const updateContactSchema: () => PromptDefinition[] = () => [
	{
		type: "input",
		key: "username",
		message: "Username:",
		validator: (value: string) => {
			const validator = new Validator(value);
			const error = validator.isEmpty().getError();

			return error ?? true;
		},
	},
	{
		type: "input",
		key: "phone",
		message: "New phone:",
		validator: (value: string) => {
			const validator = new Validator(value);
			const error = validator.isMobile().getError();

			return error ?? true;
		},
	},
];
