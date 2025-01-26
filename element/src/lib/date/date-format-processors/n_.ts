import {
  DATE_WEEKDAY_NUMERIC,
  TEXT_DISPLAY_TYPE_WEEKDAY,
} from '../types.js'

import type {
  TextDisplayPartWeekday,
} from '../types.js'

export function N() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}