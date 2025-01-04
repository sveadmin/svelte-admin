import {
  DATE_ERA_SHORT,
  TEXT_DISPLAY_TYPE_ERA,
} from '../types.js'

import type {
  TextDisplayPartEra,
} from '../types.js'

export function ee() : TextDisplayPartEra {
  return {
    options: {
      era: DATE_ERA_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_ERA,
  }
}