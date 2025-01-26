import type {
  NumberOptions,
} from '$lib/number/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterFractionDigits(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('fractionDigits')) {
    if (Array.isArray(parameters.fractionDigits)) {
      if (parameters.fractionDigits[0] !== null) {
        options.maximumFractionDigits = parameters.fractionDigits[0]
      }
      options.minimumFractionDigits = parameters.fractionDigits[1]
    } else {
      options.maximumFractionDigits = parameters.fractionDigits
    }

    delete parameters.fractionDigits
  }
} 