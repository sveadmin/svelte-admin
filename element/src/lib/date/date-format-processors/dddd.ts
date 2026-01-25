import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
  DATE_WEEKDAY_LONG,
} from '../weekday-types.js'

import type {
  TextDisplayPartWeekday,
} from '../weekday-types.js'

export function dddd() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_LONG,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}