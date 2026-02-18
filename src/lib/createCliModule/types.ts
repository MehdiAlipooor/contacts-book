// biome-ignore lint/suspicious/noExplicitAny: <Because i couldnt sync the type with the inquirer/prompts package>
export type InquirerChoices = any;

export type InputCommandTheme = {
	prefix: string | { idle: string; done: string };
	spinner: {
		interval: number;
		frames: string[];
	};
	style: {
		answer: (text: string) => string;
		message: (text: string, status: "idle" | "done" | "loading") => string;
		error: (text: string) => string;
		defaultAnswer: (text: string) => string;
	};
	validationFailureMode: "keep" | "clear";
};

export type SearchResponse = {
	name: string;
	value: string;
	description: string;
};

export type InputCommandValidator = (
	input: string,
) => boolean | string | Promise<boolean | string>;

export type PromptDefinition =
	| {
			type: "input";
			message: string;
			key: string;
			validator?: InputCommandValidator;
			theme?: InputCommandTheme;
			required?: boolean;
	  }
	| {
			type: "select";
			message: string;
			key: string;
			choices: InquirerChoices[];
			required?: boolean;
	  }
	| {
			type: "search";
			message: string;
			key: string;
			onSearch: (input: string) => Promise<SearchResponse[]>;
			required?: boolean;
	  };

export type CliModuleConfig = {
	prompts: PromptDefinition[];
	action: (answers: Record<string, string>) => void | Promise<void>;
};

export type InputCommandProps = {
	message: string;
	validator?: InputCommandValidator;
	theme?: InputCommandTheme;
};

export type SelectCommandProps = {
	message: string;
	choices: InquirerChoices[];
};

export type SeachCommandProps = {
	message: string;
	onSearch: (input: string) => Promise<SearchResponse[]>;
};
