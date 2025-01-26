import {
  TEXT_DISPLAY_TYPE_MONTH,
  DATE_MONTH_NUMERIC,
} from '../types.js'

import type {
  TextDisplayPartMonth,
} from '../types.js'

export function m() : TextDisplayPartMonth {
  return {
    options: {
      month: DATE_MONTH_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_MONTH,
  }
}