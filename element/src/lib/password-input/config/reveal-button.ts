import {
  SIZE_MEDIUM,
} from '$lib/types.js'

import {
  COMPONENT_BUTTON,
} from '$lib/button/index.js'

import type {
  ComponentButton,
  ButtonInputProps,
} from '$lib/button/index.js'

export function revealButton(options: ButtonInputProps) : ComponentButton {
  return {
    input: {
      config: {
        childrenStyle: ((!options.size || options.size === SIZE_MEDIUM) ? 'font-size:1.125em' : 'font-size:1.15em'),
        isAttachedOnLeft: true,
        type: 'button',
        ...options
      }
    },
    type: COMPONENT_BUTTON,
  }
}