import type {
  NumberOptions,
} from '$lib/text-display/index.js'

import type {
  UnitDisplayProps,
} from '../types.js'

export function optionConverterUnitDisplay(parameters: Omit<UnitDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('unitDisplay')) {
    options.unitDisplay = parameters.unitDisplay

    delete parameters.unitDisplay
  }
} 