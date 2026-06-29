import {
  COMPONENT_TEXT_DISPLAY_WRAPPED,
} from '$lib/text-display/index.js'

import type {
  ComponentTextDisplayWrapped,
  TextWrappedDisplayProps,
} from '$lib/text-display/index.js'

export function ipAddressTripletDividerGenerator (options?: TextWrappedDisplayProps) : ComponentTextDisplayWrapped {
  return {
    display: {
      config: {
        isFloating: true,
        value: '.',
        ...options
      }
    },
    type: COMPONENT_TEXT_DISPLAY_WRAPPED,
  }
}