import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_LONG,
} from '../types.js'

import type {
  TextDisplayPartMonth,
} from '../types.js'

export function mmmm() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_LONG,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}