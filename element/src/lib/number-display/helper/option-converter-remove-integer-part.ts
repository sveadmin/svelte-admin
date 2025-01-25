import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterRemoveIntegerPart(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('removeIntegerPart')) {
    options.removeIntegerPart = parameters.removeIntegerPart

    delete parameters.removeIntegerPart
  }
} 