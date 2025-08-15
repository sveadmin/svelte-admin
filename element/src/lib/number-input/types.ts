
import type {
  NumberDisplayProps,
} from '$lib/number-display/index.js';

import type {
  TextInputProps,
} from '$lib/text-input/index.js'

export const COMPONENT_NUMBER_INPUT = 'number-input'

export interface NumberInputProps extends TextInputProps,
  NumberDisplayProps
{
  value?: number;
  decimalSeparator?: string;
  digits?: number;
  fractionDigits?: number;
  isClearButtonEnabled?: boolean;
  isCopyButtonEnabled?: boolean;
  precisionDigits?: number;
  // thousandSeparator?: number;
}