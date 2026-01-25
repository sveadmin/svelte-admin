import {
  DATE_WEEK_NUMERIC,
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import type {
  TextDisplayPartWeek,
} from '../week-types.js'

export function W() : TextDisplayPartWeek {
  return {
    options: {
      week: DATE_WEEK_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_WEEK,
  }
}