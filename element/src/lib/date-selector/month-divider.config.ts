import {
  COMPONENT_TEXT_DISPLAY_WRAPPED,
} from '$lib/text-display/index.js'

import type {
  ComponentTextDisplayWrapped,
  TextDisplayWrappedProps,
} from '$lib/text-display/index.js'

export const monthDividerGenerator = (options: TextDisplayWrappedProps = {}) : ComponentTextDisplayWrapped => {
  return {
    display: {
      config: {
        isFloating: true,
        value: '/',
        ...options
      }
    },
    type: COMPONENT_TEXT_DISPLAY_WRAPPED,
  }
}