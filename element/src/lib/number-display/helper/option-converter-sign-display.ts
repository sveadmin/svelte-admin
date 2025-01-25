import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterSignDisplay(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('signDisplay')) {
    options.signDisplay = parameters.signDisplay

    delete parameters.signDisplay
  }
} 