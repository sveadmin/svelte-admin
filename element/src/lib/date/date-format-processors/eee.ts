import {
  DATE_ERA_LONG,
  TEXT_DISPLAY_TYPE_ERA,
} from '../types.js'

import type {
  TextDisplayPartEra,
} from '../types.js'

export function eee() : TextDisplayPartEra {
  return {
    options: {
      era: DATE_ERA_LONG,
    },
    type: TEXT_DISPLAY_TYPE_ERA,
  }
}