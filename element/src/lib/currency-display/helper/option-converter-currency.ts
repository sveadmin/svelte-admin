import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  CurrencyDisplayProps,
} from '../types.js'

export function optionConverterCurrency(parameters: Omit<CurrencyDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('currency')) {
    options.currency = parameters.currency

    delete parameters.currency
  }
} 