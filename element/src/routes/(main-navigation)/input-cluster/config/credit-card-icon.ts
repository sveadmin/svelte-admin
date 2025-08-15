import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'

import type {
  InputPartImage,
} from '$lib/image/index.js'

export const creditCardIconGenerator = (size?: AllowedSize) : InputPartImage => {
  return {
    editor: {
      seamless: true
    },
    size,
    type: COMPONENT_IMAGE,
    icon: 'credit-card'
  }
}