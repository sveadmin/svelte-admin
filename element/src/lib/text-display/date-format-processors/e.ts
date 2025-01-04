import {
  DATE_ERA_NARROW,
  TEXT_DISPLAY_TYPE_ERA,
} from '../types.js'

import type {
  TextDisplayPartEra,
} from '../types.js'

export function e() : TextDisplayPartEra {
  return {
    options: {
      era: DATE_ERA_NARROW,
    },
    type: TEXT_DISPLAY_TYPE_ERA,
  }
}