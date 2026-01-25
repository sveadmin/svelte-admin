import type {
  TextDisplayPartBase,
} from '$lib/literal/types.js'

import type {
  CommonInputProps,
} from '$lib/types.js'

import type {
  NumberCompactDisplay,
  NumberCurrencyDisplay,
  NumberCurrencySign,
  NumberNotation,
  NumberRoundingMode,
  NumberRoundingPriority,
  NumberSignDisplay,
  NumberStyles,
  NumberTrailingZeroDisplay,
  NumberUnitDisplay,
  NumberUseGrouping,
  RoundingIncrements,
} from './type.const.js'

export interface EditorPartNumber {
}

export interface NumberOptions {
  compactDisplay?: NumberCompactDisplay;
  currency?: string; //https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
  currencyDisplay?: NumberCurrencyDisplay;
  currencySign?: NumberCurrencySign;
  //localeMatcher is ignored in this implementation
  maximumFractionDigits?: number; //0 - 100
  maximumSignificantDigits?: number; //1 - 21
  minimumFractionDigits?: number; //0 - 100
  minimumIntegerDigits?: number; //1 - 21
  minimumSignificantDigits?: number; //1 - 21
  notation?: NumberNotation;
  removeIntegerPart?: boolean;
  roundingIncrement?: RoundingIncrements;
  roundingMode?: NumberRoundingMode;
  roundingPriority?: NumberRoundingPriority;
  signDisplay?: NumberSignDisplay;
  style?: NumberStyles;
  trailingZeroDisplay?: NumberTrailingZeroDisplay;
  unit?: string; //https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
  unitDisplay?: NumberUnitDisplay;
  useGrouping?: NumberUseGrouping;
}

export const TEXT_DISPLAY_TYPE_NUMBER = 'number'

export interface TextDisplayPartNumber extends TextDisplayPartBase {
  locale?: string,
  options?: NumberOptions,
  type: typeof TEXT_DISPLAY_TYPE_NUMBER,
}

export interface TextInputPartNumber extends
  CommonInputProps,
  Omit<TextDisplayPartNumber, 'type'>
{
  editor?: EditorPartNumber;
}