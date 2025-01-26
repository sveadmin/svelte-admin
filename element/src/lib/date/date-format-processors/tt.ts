import {
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TIME_DAY_PERIOD_SHORT,
} from '../types.js'

import type {
  TextDisplayPartDayPeriod,
} from '../types.js'

export function tt() : TextDisplayPartDayPeriod {
  return {
    options: {
      dayPeriod: TIME_DAY_PERIOD_SHORT,
      lowerCase: true,
    },
    type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
  }
}