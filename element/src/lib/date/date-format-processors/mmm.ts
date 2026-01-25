import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_SHORT,
} from '../month-types.js'

import type {
  TextDisplayPartMonth,
} from '../month-types.js'

export function mmm() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}