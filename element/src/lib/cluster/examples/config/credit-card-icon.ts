import {
  COMPONENT_IMAGE_WRAPPED,
} from '$lib/image/index.js'

import type {
  ComponentImageWrapped,
  ImageWrappedDisplayProps
} from '$lib/image/index.js'

export const creditCardIconGenerator = (options?: ImageWrappedDisplayProps) : ComponentImageWrapped => {
  return {
    display: {
      config: {
        icon: 'credit-card',
        seamless: true,
        ...options,
      }
    },
    type: COMPONENT_IMAGE_WRAPPED,
  }
}