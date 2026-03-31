import type {
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  Option,
  OptionStore,
  SveadminComponent,
} from '$lib/types.js'

import type {
  DropdownSearchInputProps,
} from '$lib/dropdown-search/index.js'

import type {
  ImageProps
} from '$lib/image/index.js';

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_COUNTRY_SELECTOR = 'country-selector'

export const COMPONENT_FLAG_INPUT = 'flag-input'

export interface CountrySelectorProps extends DropdownSearchInputProps {
  countryOptions?: Option[] | OptionStore;
  isInputHidden?: boolean;
  topOptions?: string[];
}

export interface FlagInputProps extends CountrySelectorProps {
  childrenConfig?: {
    0?: ImageProps;
    1?: TextInputProps;
    flag?: ImageProps;
    input?: TextInputProps;
  };
}

export interface RenderSuggestionProps extends
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional
{
  suggestion: string | null | null;
  isSelected: boolean;
  options?: OptionStore
}

export interface ComponentCountrySelector extends SveadminComponent<
  typeof COMPONENT_COUNTRY_SELECTOR,
  undefined,
  CountrySelectorProps
>
{
}

export interface ComponentFlagInput extends SveadminComponent<
  typeof COMPONENT_FLAG_INPUT,
  undefined,
  FlagInputProps
>
{
}