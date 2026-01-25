import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
  DATE_WEEKDAY_DELTA_SHORT,
} from '../weekday-types.js'

import type {
  TextDisplayPartWeekday,
} from '../weekday-types.js'

export function DDD() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_DELTA_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}