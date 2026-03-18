import {
  COMPONENT_WEEKDAY,
  DATE_WEEKDAY_DELTA_SHORT,
} from '../weekday-types.js'

import type {
  ComponentWeekday,
} from '../weekday-types.js'

export function DDD() : ComponentWeekday {
  return {
    display: {
      config: {
        weekday: DATE_WEEKDAY_DELTA_SHORT,
      }
    },
    type: COMPONENT_WEEKDAY,
  }
}