import {
  TEXT_DISPLAY_TYPE_YEAR,
  DATE_YEAR_NUMERIC,
} from '../year-types.js'

import type {
  TextDisplayPartYear,
} from '../year-types.js'

export function yyyy() : TextDisplayPartYear {
  return {
    options: {
      year: DATE_YEAR_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_YEAR,
  }
}