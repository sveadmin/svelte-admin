import {
  TEXT_DISPLAY_TYPE_DAY,
  DATE_DAY_2DIGIT,
} from '../types.js'

import type {
  TextDisplayPartDay,
} from '../types.js'

export function dd() : TextDisplayPartDay {
  return {
    options: {
      day: DATE_DAY_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_DAY,
  }
}