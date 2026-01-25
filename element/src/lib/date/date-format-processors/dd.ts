import {
  TEXT_DISPLAY_TYPE_DAY,
  DATE_DAY_2DIGIT,
} from '../day-types.js'

import type {
  TextDisplayPartDay,
} from '../day-types.js'

export function dd() : TextDisplayPartDay {
  return {
    options: {
      day: DATE_DAY_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_DAY,
  }
}