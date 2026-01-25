import {
  TEXT_DISPLAY_TYPE_MINUTE,
  TIME_MINUTE_NUMERIC,
} from '../minute-types.js'

import type {
  TextDisplayPartMinute,
} from '../minute-types.js'

export function M() : TextDisplayPartMinute {
  return {
    options: {
      minute: TIME_MINUTE_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_MINUTE,
  }
}