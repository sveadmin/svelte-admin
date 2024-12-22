import {
  TEXT_DISPLAY_TYPE_DAY,
  DATE_DAY_NUMERIC,
} from '../types.js'

import type {
  TextDisplayPartDay,
} from '../types.js'

export function d() : TextDisplayPartDay {
  return {
    options: {
      day: DATE_DAY_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_DAY,
  }
}