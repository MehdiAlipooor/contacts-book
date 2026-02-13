import type { SearchResponse } from "./types";

export const searchResultMapper = (results: SearchResponse[]) => {
	return results.map((item) => ({
		name: item.name || item.value,
		value: item.value,
		description: item.description,
	}));
};
