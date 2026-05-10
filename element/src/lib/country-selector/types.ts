import type {
  OnKeyUpOptional,
  OnMouseDownOptional,
  OnMouseUpOptional,
  Option,
  OptionStore,
  SveadminComponent,
} from '$lib/types.js'

import type {
  ClusterDisplayProps,
} from '$lib/cluster/index.js'

import type {
  DropdownSearchExportProps,
  DropdownSearchInputProps,
} from '$lib/dropdown-search/index.js'

import type {
  ImageDisplayProps
} from '$lib/image/index.js';

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_COUNTRY_SELECTOR = 'country-selector'

export const COMPONENT_FLAG_INPUT = 'flag-input'

export interface CountrySelectorInputProps extends DropdownSearchExportProps,
  DropdownSearchInputProps
{
  countryOptions?: Option[] | OptionStore;
  childrenConfig?: {
    0?: DropdownSearchInputProps,
    dropdown?: DropdownSearchInputProps,
  },
  isInputHidden?: boolean;
  topOptions?: string[];
}

export interface FlagInputProps extends ClusterDisplayProps,
  CountrySelectorInputProps {
  childrenConfig?: {
    0?: ImageDisplayProps;
    1?: TextInputProps;
    flag?: ImageDisplayProps;
    input?: TextInputProps;
    [key: PropertyKey] : any; // This is mainly for the dynamic configurations for the inputComponent
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
  undefined,
  CountrySelectorInputProps
>
{
}

export interface ComponentFlagInput extends SveadminComponent<
  typeof COMPONENT_FLAG_INPUT,
  undefined,
  undefined,
  FlagInputProps
>
{
}