import {
  COMPONENT_DAY_PERIOD,
  TIME_DAY_PERIOD_NARROW,
} from '../day-period-types.js'

import type {
  ComponentDayPeriod,
} from '../day-period-types.js'

export function T() : ComponentDayPeriod {
  return {
    display: {
      config: {
        dayPeriod: TIME_DAY_PERIOD_NARROW,
        lowerCase: false,
      }
    },
    type: COMPONENT_DAY_PERIOD,
  }
}