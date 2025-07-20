import type {
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
} from '$lib/types.js'

import type {
  NumberDisplayProps,
} from '$lib/number-display/types.js'

import type {
  NumberCurrencyDisplay,
  NumberCurrencySign,
} from '$lib/number/types.js'

export const COMPONENT_NUMBER_DISPLAY = 'number-display'

export interface CurrencyDisplayProps extends
  NumberDisplayProps
{
  currency?: string; //https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes
  currencyDisplay?: NumberCurrencyDisplay;
  currencySign?: NumberCurrencySign;
}

export interface CurrencyDisplayWrappedProps extends
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
  CurrencyDisplayProps
{
  digitsToFractionRatio?: [number, number]
}