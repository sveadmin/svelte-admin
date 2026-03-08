import type {
  AllowedSize
} from '$lib/types.js'

import {
  COMPONENT_LITERAL,
} from '$lib/literal/index.js'

import type {
  SveaComponentLiteral,
} from '$lib/literal/index.js'

export function decimalSeparatorGenerator(decimalSeparator: string = ',', size?: AllowedSize) : SveaComponentLiteral {
  return {
    display: {
      borderless: true,
      size,
      value: decimalSeparator
    },
    type: COMPONENT_LITERAL,
  }
}