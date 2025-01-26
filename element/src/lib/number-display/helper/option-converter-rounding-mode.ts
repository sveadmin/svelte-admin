import type {
  NumberOptions,
} from '$lib/number/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterRoundingMode(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('roundingMode')) {
    options.roundingMode = parameters.roundingMode

    delete parameters.roundingMode
  }
} 