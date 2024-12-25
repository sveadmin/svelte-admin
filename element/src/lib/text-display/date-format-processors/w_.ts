import {
  DATE_WEEK_NUMERIC,
  TEXT_DISPLAY_TYPE_WEEK,
} from '../types.js'

import type {
  TextDisplayPartWeek,
} from '../types.js'

export function W() : TextDisplayPartWeek {
  return {
    options: {
      week: DATE_WEEK_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_WEEK,
  }
}