import type {
  CommonInputProps,
  Option,
  OptionStore,
} from '$lib/types.js'

import type {
  DropdownSearchProps,
} from '$lib/dropdown-search/index.js'

export const COMPONENT_COUNTRY_SELECTOR = 'country-selector'

export interface CountrySelectorProps extends DropdownSearchProps {
  countryOptions?: Option[] | OptionStore;
  topOptions?: string[];
}

export interface EditorPartCountrySelector {
}

export interface CountrySelectorPartDropdown extends 
  CommonInputProps,
  CountrySelectorProps
{
  editor?: EditorPartCountrySelector,
  type: typeof COMPONENT_COUNTRY_SELECTOR,

}