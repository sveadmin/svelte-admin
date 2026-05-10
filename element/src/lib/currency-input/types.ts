import type {
  Option,
  OptionStore,
  SveadminComponent
} from '$lib/types.js'

import type {
  ClusterDisplayProps,
} from '$lib/cluster/index.js'

import type {
  DropdownSearchInputProps,
} from '$lib/dropdown-search/types.js'

import type {
  NumberInputProps,
} from '$lib/number-input/types.js'

export const COMPONENT_CURRENCY_INPUT = 'currency-input'

export interface ComponentCurrencyInput extends SveadminComponent<
  typeof COMPONENT_CURRENCY_INPUT,
  undefined,
  undefined,
  CurrencyInputProps
>
{
}

export interface CurrencyInputProps extends Omit<ClusterDisplayProps, 'value'>,
  NumberInputProps {
  childrenConfig?: {
    0?: DropdownSearchInputProps;
  };
  currencies?: Option[] | OptionStore;
  currency?: string | number;
  isCurrencyOnRight?: boolean;
}