import {
  DATE_ERA_SHORT,
  TEXT_DISPLAY_TYPE_ERA,
} from '../era-types.js'

import type {
  TextDisplayPartEra,
} from '../era-types.js'

export function ee() : TextDisplayPartEra {
  return {
    options: {
      era: DATE_ERA_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_ERA,
  }
}