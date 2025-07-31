import {
  ValidatorStore,
} from '@sveadmin/common'

import {
  Option
} from '../dropdown-search/types.js'

export const COMPONENT_CURRENCY_INPUT = 'currency-input'

export interface CurrencyInputProps {
  currencies: Option[];
  currencyId: string;
  decimals?: number;
  digits?: number;
  getValue?: {() : string | number};
  id?: string;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}