import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_NUMERIC,
} from '../month-types.js'

import type {
  TextDisplayPartMonth,
} from '../month-types.js'

export function m() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}