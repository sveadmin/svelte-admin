import {
  TEXT_DISPLAY_TYPE_YEAR,
  DATE_YEAR_2DIGIT,
} from '../year-types.js'

import type {
  TextDisplayPartYear,
} from '../year-types.js'

export function yy() : TextDisplayPartYear {
  return {
    options: {
      year: DATE_YEAR_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_YEAR,
  }
}