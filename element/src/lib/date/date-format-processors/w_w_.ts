import {
  DATE_WEEK_2DIGIT,
  TEXT_DISPLAY_TYPE_WEEK,
} from '../week-types.js'

import type {
  TextDisplayPartWeek,
} from '../week-types.js'

export function WW() : TextDisplayPartWeek {
  return {
    options: {
      week: DATE_WEEK_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_WEEK,
  }
}