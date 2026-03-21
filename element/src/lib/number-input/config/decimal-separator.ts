import type {
  AllowedSize
} from '$lib/types.js'

import {
  COMPONENT_TEXT_DISPLAY_WRAPPED,
} from '$lib/text-display/index.js'

import type {
  ComponentTextDisplayWrapped,
} from '$lib/text-display/index.js'

export function decimalSeparatorGenerator(decimalSeparator: string = ',', size?: AllowedSize) : ComponentTextDisplayWrapped {
  return {
    display: {
      config: {
        isFloating: true,
        size,
        value: decimalSeparator
      }
    },
    type: COMPONENT_TEXT_DISPLAY_WRAPPED,
  }
}