import type {
  AllowedSize
} from '$lib/types.js'

import {
  COMPONENT_LITERAL_WRAPPED,
} from '$lib/literal/index.js'

import type {
  SveaComponentLiteralWrapped,
} from '$lib/literal/index.js'

export function decimalSeparatorGenerator(decimalSeparator: string = ',', size?: AllowedSize) : SveaComponentLiteralWrapped {
  return {
    display: {
      isFloating: true,
      size,
      value: decimalSeparator
    },
    type: COMPONENT_LITERAL_WRAPPED,
  }
}