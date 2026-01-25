import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_2DIGIT,
} from '../month-types.js'

import type {
  TextDisplayPartMonth,
} from '../month-types.js'

export function mm() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}