import type {
  AllowedSize,
} from '$lib/types.js'

import {
  TEXT_DISPLAY_TYPE_LITERAL,
} from '$lib/literal/index.js'

import type {
  InputPartLiteral,
} from '$lib/literal/index.js'

export const monthDividerGenerator = (size?: AllowedSize) : InputPartLiteral => {
  return {
    editor: {
      borderless: true,
    },
    size,
    type: TEXT_DISPLAY_TYPE_LITERAL,
    value: '/'
  }
}