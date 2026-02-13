import type {
	PromptDefinition,
	SearchResponse,
} from "../../../lib/createCliModule/types";

type Props = {
	onSearch: (input: string) => Promise<SearchResponse[]>;
};

export const getContactByUsernameSchema: ({
	onSearch,
}: Props) => PromptDefinition[] = ({ onSearch }) => {
	return [
		{
			type: "search",
			key: "username",
			message: "Username:",
			onSearch,
		},
	];
};
