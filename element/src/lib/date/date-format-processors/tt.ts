import {
  COMPONENT_DAY_PERIOD,
  TIME_DAY_PERIOD_SHORT,
} from '../day-period-types.js'

import type {
  ComponentDayPeriod,
} from '../day-period-types.js'

export function tt() : ComponentDayPeriod {
  return {
    display: {
      config: {
        dayPeriod: TIME_DAY_PERIOD_SHORT,
        lowerCase: true,
      }
    },
    type: COMPONENT_DAY_PERIOD,
  }
}