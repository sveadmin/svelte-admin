import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  UnitDisplayProps,
} from '../types.js'

export function optionConverterUnit(parameters: Omit<UnitDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('unit')) {
    options.unit = parameters.unit

    delete parameters.unit
  }
} 