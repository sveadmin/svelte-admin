import {
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TIME_DAY_PERIOD_NARROW,
} from '../types.js'

import type {
  TextDisplayPartDayPeriod,
} from '../types.js'

export function t() : TextDisplayPartDayPeriod {
  return {
    options: {
      dayPeriod: TIME_DAY_PERIOD_NARROW,
    },
    type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
  }
}