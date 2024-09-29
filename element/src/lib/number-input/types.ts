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
  getValue?: {() : string | number};
  id?: string;
  thousandSeparator?: number;
  validators?: ValidatorStore;
  value: string | number;
}

export const COMPONENT_NUMBER_INPUT = 'number-input'