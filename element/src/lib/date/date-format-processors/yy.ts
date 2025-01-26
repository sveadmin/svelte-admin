import {
  TEXT_DISPLAY_TYPE_YEAR,
  DATE_YEAR_2DIGIT,
} from '../types.js'

import type {
  TextDisplayPartYear,
} from '../types.js'

export function yy() : TextDisplayPartYear {
  return {
    options: {
      year: DATE_YEAR_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_YEAR,
  }
}