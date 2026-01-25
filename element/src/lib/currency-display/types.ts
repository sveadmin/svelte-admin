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
} from '$lib/number/index.js'

export const COMPONENT_CURRENCY_DISPLAY = 'currency-display'

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

export interface CurrencyEditorProps {

}

export interface TextDisplayPartCurrency extends CurrencyDisplayProps {
  editor?: CurrencyEditorProps;
  type: typeof COMPONENT_CURRENCY_DISPLAY;
}