import type {
  CommonInputProps,
  Option,
  OptionStore,
} from '$lib/types.js'

import type {
  CountrySelectorProps,
} from '$lib/country-selector/index.js'

export const COMPONENT_PHONE_PREFIX_SELECTOR = 'phone-prefix-selector'

export interface PhonePrefixSelectorProps extends CountrySelectorProps {
  phonePrefixOptions?: Option[] | OptionStore;
}

export interface EditorPartPhonePrefixSelector {
}

export interface PhonePrefixSelectorPartDropdown extends 
  Omit<CommonInputProps, 'callbacks'>,
  PhonePrefixSelectorProps
{
  editor?: EditorPartPhonePrefixSelector,
  type: typeof COMPONENT_PHONE_PREFIX_SELECTOR,
}