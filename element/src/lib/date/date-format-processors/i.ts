import {
  DATE_INTERVAL_NARROW,
  TEXT_DISPLAY_TYPE_INTERVAL,
} from '../interval-types.js'

import type {
  TextDisplayPartInterval,
} from '../interval-types.js'

export function i() : TextDisplayPartInterval {
  return {
    options: {
      interval: DATE_INTERVAL_NARROW
    },
    type: TEXT_DISPLAY_TYPE_INTERVAL,
  }
}