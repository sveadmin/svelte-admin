import type {
  NumberOptions,
} from '$lib/number/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterUseGrouping(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('useGrouping')) {
    options.useGrouping = parameters.useGrouping

    delete parameters.useGrouping
  }
} 