import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_2DIGIT,
} from '../types.js'

import type {
  TextDisplayPartMonth,
} from '../types.js'

export function mm() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}