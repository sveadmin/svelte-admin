import {
  COMPONENT_BUTTON,
} from '$lib/button/index.js'

import type {
  ComponentButton,
  ButtonInputProps,
} from '$lib/button/index.js'

export function clearButton(options: ButtonInputProps) : ComponentButton {
  return {
    input: {
      config: {
        leftIcon: 'erase',
        isStatic: true,
        ...options
      }
    },
    type: COMPONENT_BUTTON,
  }
}