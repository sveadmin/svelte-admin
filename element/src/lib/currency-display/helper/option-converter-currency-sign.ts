import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  CurrencyDisplayProps,
} from '../types.js'

export function optionConverterCurrencySign(parameters: Omit<CurrencyDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('currencySign')) {
    options.currencySign = parameters.currencySign

    delete parameters.currencySign
  }
} 