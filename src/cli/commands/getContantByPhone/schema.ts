import type { PromptDefinition } from "../../../lib/createCliModule/types";
import { Validator } from "../../../utils/validator";

export const getContantByPhoneSchema: () => PromptDefinition[] = () => [
	{
		type: "input",
		key: "phone",
		message: "Phone:",
		validator: (value: string) => {
			const validator = new Validator(value);
			const error = validator.isEmpty().isMobile().getError();

			return error ?? true;
		},
	},
];
