import {
  COMPONENT_BUTTON,
} from '$lib/button/index.js'

import type {
  ComponentButton,
  ButtonInputProps,
} from '$lib/button/index.js'

export function copyButton(options: ButtonInputProps) : ComponentButton {
  return {
    input: {
      config: {
        leftIcon: 'copy',
        isStatic: true,
        ...options
      }
    },
    type: COMPONENT_BUTTON,
  }
}