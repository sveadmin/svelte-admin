  import {
    ValidatorStore,
  } from '@sveadmin/common'
  

  import {
    Option
  } from '../dropdown-search/types'

export interface CurrencyInputProps {
  currencies: Array<Option>;
  currencyId: string;
  decimals?: number;
  digits?: number;
  id?: string;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}