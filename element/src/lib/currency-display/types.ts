import type {
  Component,
} from 'svelte'

import type {
  ClassListOptional,
  ContainerClassListOptional,
  ContainerStyleOptional,
  OnClickOptional,
  StyleOptional,
  SveadminComponent
} from '$lib/types.js'

import type {
  NumberDisplayProps,
} from '$lib/number-display/types.js'

import type {
  NumberCurrencyDisplay,
  NumberCurrencySign,
} from '$lib/number/index.js'

export const COMPONENT_CURRENCY_DISPLAY = 'currency-display'

export const COMPONENT_CURRENCY_DISPLAY_WRAPPED = 'currency-display-wrapped'

export interface ComponentNumberDisplay extends SveadminComponent<
  typeof COMPONENT_CURRENCY_DISPLAY,
  undefined,
  CurrencyDisplayProps
>
{
}

export interface ComponentNumberDisplayWrapped extends SveadminComponent<
  typeof COMPONENT_CURRENCY_DISPLAY_WRAPPED,
  undefined,
  CurrencyDisplayWrappedProps
>
{
}

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
  childrenConfig?: {
    0?: CurrencyDisplayProps,
    1?: CurrencyDisplayProps,
    digit?: CurrencyDisplayProps,
    fraction?: CurrencyDisplayProps,
  },
  digitWidth?: string | number,
  displayComponent?: Component<any>;
  fractionWidth?: string | number,
}