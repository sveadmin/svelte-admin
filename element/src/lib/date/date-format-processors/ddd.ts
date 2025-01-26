import {
  TEXT_DISPLAY_TYPE_WEEKDAY,
  DATE_WEEKDAY_SHORT,
} from '../types.js'

import type {
  TextDisplayPartWeekday,
} from '../types.js'

export function ddd() : TextDisplayPartWeekday {
  return {
    options: {
      weekday: DATE_WEEKDAY_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_WEEKDAY,
  }
}