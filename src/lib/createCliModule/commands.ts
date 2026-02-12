import { input, search, select } from '@inquirer/prompts';
import { InputCommandTheme, InputCommandValidator, InquirerChoices, SearchResponse } from './types';
import { searchResultMapper } from './searchResultMapper';

type InputCommandProps = {
  message: string;
  validator?: InputCommandValidator;
  theme?: InputCommandTheme;
};

type SelectCommandProps = {
  message: string;
  choices: InquirerChoices[];
};

type SeachCommandProps = {
  message: string;
  onSearch: (input: string) => Promise<SearchResponse[]>;
};

export const commands = {
  input: async (props: InputCommandProps) => {
    return await input(props);
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
