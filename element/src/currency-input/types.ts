  import {
    ValidatorStore,
  } from '@sveadmin/common'
  

  import {
    Option
  } from '../dropdown-search/types.js'

export interface CurrencyInputProps {
  currencies: Array<Option>;
  currencyId: string;
  decimals?: number;
  digits?: number;
  getValue?: {() : string | number};
  id?: string;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}

export const COMPONENT_CURRENCY_INPUT = 'currency-input'