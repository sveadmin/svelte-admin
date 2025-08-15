import type {
  AllowedSize
} from '$lib/types.js'

import type {
  TextInputPartText
} from '$lib/text-input/index.js'


export function fractionGenerator(fractionDigits: number, size?: AllowedSize) : TextInputPartText {
  return {
    isAttachedOnLeft: true,
    size,
    type: 'text',
    visibleWidth: fractionDigits + 'ch',
  }
}