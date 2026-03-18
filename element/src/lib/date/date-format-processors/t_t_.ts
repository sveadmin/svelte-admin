import {
  COMPONENT_DAY_PERIOD,
  TIME_DAY_PERIOD_SHORT,
} from '../day-period-types.js'

import type {
  ComponentDayPeriod,
} from '../day-period-types.js'

export function TT() : ComponentDayPeriod {
  return {
    display: {
      config: {
        dayPeriod: TIME_DAY_PERIOD_SHORT,
        lowerCase: false,
      }
    },
    type: COMPONENT_DAY_PERIOD,
  }
}