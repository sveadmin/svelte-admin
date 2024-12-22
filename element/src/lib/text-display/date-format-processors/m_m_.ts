import {
  TEXT_DISPLAY_TYPE_MINUTE,
  TIME_MINUTE_2DIGIT,
} from '../types.js'

import type {
  TextDisplayPartMinute,
} from '../types.js'

export function MM() : TextDisplayPartMinute {
  return {
    options: {
      minute: TIME_MINUTE_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_MINUTE,
  }
}