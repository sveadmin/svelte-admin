import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
  DATE_WEEKDAY_DELTA_LONG,
} from '../types.js'

import type {
  TextDisplayPartWeekday,
} from '../types.js'

export function DDDD() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_DELTA_LONG,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}