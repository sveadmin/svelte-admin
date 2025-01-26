import type {
  NumberOptions,
} from '$lib/number/index.js'

import type {
  NumberDisplayProps,
} from '../types.js'

export function optionConverterZeroPadded(parameters: Omit<NumberDisplayProps, 'value'>, options: NumberOptions) : void {
  if (parameters.hasOwnProperty('zeroPadded')
    && parameters.zeroPadded
    && parameters.zeroPadded > 0) {
    options.minimumIntegerDigits = parameters.zeroPadded
    options.useGrouping = false

    delete parameters.zeroPadded
  }
} 