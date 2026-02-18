import type {
	PromptDefinition,
	SearchResponse,
} from "@/lib/createCliModule/types";

type RemoveContactSchema = ({
	onSearch,
}: {
	onSearch: (input: string) => Promise<SearchResponse[]>;
}) => PromptDefinition[];

export const removeContactSchema: RemoveContactSchema = ({ onSearch }) => [
	{
		type: "search",
		key: "username",
		message: "Username:",
		onSearch,
	},
];
