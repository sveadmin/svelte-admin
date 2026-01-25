import type {
  Option,
  OptionStore
} from '$lib/types.js'

import type {
  DropdownSearchProps,
} from '$lib/dropdown-search/types.js'

import type {
  NumberInputProps,
} from '$lib/number-input/types.js'

export const COMPONENT_CURRENCY_INPUT = 'currency-input'

export interface CurrencyInputProps extends NumberInputProps {
  childrenConfig?: {
    0?: DropdownSearchProps;
  };
  currencies?: Option[] | OptionStore;
  currency?: string | number;
}

export interface InputClusterPartCurrency extends Omit<CurrencyInputProps, 'type'> {
  type: typeof COMPONENT_CURRENCY_INPUT;
}