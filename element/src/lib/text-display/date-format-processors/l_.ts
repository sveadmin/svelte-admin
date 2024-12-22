import {
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
} from '../types.js'

import type {
  TextDisplayPartFractionalSecond,
} from '../types.js'

export function L() : TextDisplayPartFractionalSecond {
  return {
    options: {
      fractionalSecondDigits: 2,
    },
    type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  }
}