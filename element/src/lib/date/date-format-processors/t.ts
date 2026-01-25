import {
  TEXT_DISPLAY_TYPE_DAY_PERIOD,
  TIME_DAY_PERIOD_NARROW,
} from '../day-period-types.js'

import type {
  TextDisplayPartDayPeriod,
} from '../day-period-types.js'

export function t() : TextDisplayPartDayPeriod {
  return {
    options: {
      dayPeriod: TIME_DAY_PERIOD_NARROW,
      lowerCase: true,
    },
    type: TEXT_DISPLAY_TYPE_DAY_PERIOD,
  }
}