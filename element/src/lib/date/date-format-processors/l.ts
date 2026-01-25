import {
  TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
} from '../fractional-second-types.js'

import type {
  TextDisplayPartFractionalSecond,
} from '../fractional-second-types.js'

export function l() : TextDisplayPartFractionalSecond {
  return {
    options: {
      fractionalSecondDigits: 3,
    },
    type: TEXT_DISPLAY_TYPE_FRACTIONAL_SECOND,
  }
}