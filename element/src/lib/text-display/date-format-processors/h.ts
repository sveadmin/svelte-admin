import {
  TEXT_DISPLAY_TYPE_HOUR,
  TIME_HOUR_NUMERIC,
  TIME_HOUR_CYCLE_H12,
} from '../types.js'

import type {
  TextDisplayPartHour,
} from '../types.js'

export function h() : TextDisplayPartHour {
  return {
    options: {
      hour: TIME_HOUR_NUMERIC,
      hourCycle: TIME_HOUR_CYCLE_H12,
    },
    type: TEXT_DISPLAY_TYPE_HOUR,
  }
}