import {
  DATE_WEEKDAY_NUMERIC,
  TEXT_DISPLAY_TYPE_WEEKDAY,
} from '../weekday-types.js'

import type {
  TextDisplayPartWeekday,
} from '../weekday-types.js'

export function N() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}