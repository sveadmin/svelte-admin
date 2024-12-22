import {
  TEXT_DISPLAY_TYPE_HOUR,
  TIME_HOUR_NUMERIC,
  TIME_HOUR_CYCLE_H23,
} from '../types.js'

import type {
  TextDisplayPartHour,
} from '../types.js'

export function H() : TextDisplayPartHour {
  return {
    options: {
      hour: TIME_HOUR_NUMERIC,
      hourCycle: TIME_HOUR_CYCLE_H23,
    },
    type: TEXT_DISPLAY_TYPE_HOUR,
  }
}