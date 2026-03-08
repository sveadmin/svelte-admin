import type {
  AllowedSize,
} from '$lib/types.js'

import {
  COMPONENT_IMAGE,
} from '$lib/image/index.js'

import type {
  SveaComponentImage,
} from '$lib/image/index.js'

export const securityIconGeneratorSecurity = (size?: AllowedSize) : SveaComponentImage => {
  return {
    display: {
      icon: 'calendar',
      seamless: true,
      size,
    },
    type: COMPONENT_IMAGE,
  }
}