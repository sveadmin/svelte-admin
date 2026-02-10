import type {
  CommonInputProps,
  Option,
  OptionStore,
} from '$lib/types.js'

import type {
  DropdownSearchProps,
} from '$lib/dropdown-search/index.js'

import type {
  ImageProps
} from '$lib/image/index.js';

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_COUNTRY_SELECTOR = 'country-selector'

export interface CountrySelectorProps extends DropdownSearchProps {
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

export interface EditorPartCountrySelector {
}

export interface CountrySelectorPartDropdown extends 
  Omit<CommonInputProps, 'callbacks'>,
  CountrySelectorProps
{
  editor?: EditorPartCountrySelector,
  type: typeof COMPONENT_COUNTRY_SELECTOR,
}