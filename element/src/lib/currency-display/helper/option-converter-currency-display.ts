import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  CurrencyDisplayProps,
} from '../types.js'

export function optionConverterCurrencyDisplay(parameters: Omit<CurrencyDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('currencyDisplay')) {
    options.currencyDisplay = parameters.currencyDisplay

    delete parameters.currencyDisplay
  }
} 