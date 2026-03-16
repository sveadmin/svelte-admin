import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_LITERAL_WRAPPED,
} from '$lib/literal/index.js'

import type {
  SveaComponentLiteralWrapped,
} from '$lib/literal/index.js'

export const monthDividerGenerator = (size?: AllowedSize) : SveaComponentLiteralWrapped => {
  return {
    display: {
      isFloating: true,
      size,
      value: '/'
    },
    type: COMPONENT_LITERAL_WRAPPED,
  }
}