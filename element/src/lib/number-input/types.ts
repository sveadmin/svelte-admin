import type {
  Component
} from 'svelte'

import type {
  SveadminComponent,
} from '$lib/types.js'

import type {
  joinerFunction,
  maskPartReducerFunction,
} from '$lib/cluster/index.js';

import type {
  NumberDisplayProps,
} from '$lib/number-display/index.js';

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_NUMBER_INPUT = 'number-input'

export interface ComponentNumberInput extends SveadminComponent<
  typeof COMPONENT_NUMBER_INPUT,
  Component<NumberInputProps>,
  undefined,
  NumberInputProps
>
{
}

export const DECIMAL_SEPARATOR_CONVERTER : {[key: string] : string}= {
  '.': ',',
  ',': '.'
}

export interface NumberInputProps extends Omit<TextInputProps, 'childrenConfig'>,
  Omit<NumberDisplayProps, 'childrenConfig'>
{
  childrenConfig?: {
    0?: TextInputProps,
    1?: TextInputProps,
    digit?: TextInputProps,
    fraction?: TextInputProps,
  },
  decimalSeparator?: string;
  digits?: number;
  fractionDigits?: number;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  isIncorrectDecimalSeparatorAllowed?: boolean;
  joiner?: joinerFunction;
  maskPartReducer?: maskPartReducerFunction;
  precisionDigits?: number;
  // thousandSeparator?: number;
  value?: number | null;
}