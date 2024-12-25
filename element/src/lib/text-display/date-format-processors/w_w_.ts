import {
  DATE_WEEK_2DIGIT,
  TEXT_DISPLAY_TYPE_WEEK,
} from '../types.js'

import type {
  TextDisplayPartWeek,
} from '../types.js'

export function WW() : TextDisplayPartWeek {
  return {
    options: {
      week: DATE_WEEK_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_WEEK,
  }
}