import {
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TIME_DAY_PERIOD_SHORT,
} from '../types.js'

import type {
  TextDisplayPartDayPeriod,
} from '../types.js'

export function TT() : TextDisplayPartDayPeriod {
  return {
    options: {
      dayPeriod: TIME_DAY_PERIOD_SHORT,
      lowerCase: false,
    },
    type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
  }
}