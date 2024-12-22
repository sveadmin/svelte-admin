import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_SHORT,
} from '../types.js'

import type {
  TextDisplayPartMonth,
} from '../types.js'

export function mmm() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}