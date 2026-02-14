import { input, search, select } from "@inquirer/prompts";
import { searchResultMapper } from "./searchResultMapper";
import type {
	InputCommandProps,
	SeachCommandProps,
	SelectCommandProps,
} from "./types";

export const commands = {
	input: async (props: InputCommandProps) => {
		return await input({ ...props, validate: props?.validator });
	},
	select: async (props: SelectCommandProps) => {
		return await select(props);
	},
	search: async (props: SeachCommandProps) => {
		return await search({
			...props,
			source: async (input) => {
				if (!input || input.length < 2) {
					return [];
				}

				const results = await props.onSearch(input);
				return searchResultMapper(results);
			},
		});
	},
};
