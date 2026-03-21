import {
  COMPONENT_IMAGE_WRAPPED,
} from '$lib/image/index.js'

import type {
  ImageWrappedDisplayProps,
  ComponentImageWrapped
} from '$lib/image/index.js'

export const securityIconGeneratorSecurity = (options?: ImageWrappedDisplayProps) : ComponentImageWrapped => {
  return {
    display: {
      config: {
        icon: 'calendar',
        seamless: true,
        ...options
      }
    },
    type: COMPONENT_IMAGE_WRAPPED,
  }
}