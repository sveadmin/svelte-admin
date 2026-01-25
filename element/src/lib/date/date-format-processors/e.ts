import {
  DATE_ERA_NARROW,
  TEXT_DISPLAY_TYPE_ERA,
} from '../era-types.js'

import type {
  TextDisplayPartEra,
} from '../era-types.js'

export function e() : TextDisplayPartEra {
  return {
    options: {
      era: DATE_ERA_NARROW,
    },
    type: TEXT_DISPLAY_TYPE_ERA,
  }
}