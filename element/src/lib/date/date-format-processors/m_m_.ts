import {
  TEXT_DISPLAY_TYPE_MINUTE,
  TIME_MINUTE_2DIGIT,
} from '../minute-types.js'

import type {
  TextDisplayPartMinute,
} from '../minute-types.js'

export function MM() : TextDisplayPartMinute {
  return {
    options: {
      minute: TIME_MINUTE_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_MINUTE,
  }
}