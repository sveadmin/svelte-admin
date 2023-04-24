  import {
    ValidatorStore,
  } from '@sveadmin/common'

export interface NumberInputEvents {
  blur: CustomEvent<Event>;
  change: CustomEvent<Event>;
}

export interface NumberInputProps {
  decimals?: number;
  digits?: number;
  editor?: boolean;
  id?: string;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}