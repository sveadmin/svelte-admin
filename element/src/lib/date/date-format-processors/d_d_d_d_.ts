import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
  DATE_WEEKDAY_DELTA_LONG,
} from '../weekday-types.js'

import type {
  TextDisplayPartWeekday,
} from '../weekday-types.js'

export function DDDD() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_DELTA_LONG,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}