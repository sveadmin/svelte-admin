import {
  COMPONENT_WEEKDAY,
  DATE_WEEKDAY_SHORT,
} from '../weekday-types.js'

import type {
  ComponentWeekday,
} from '../weekday-types.js'

export function ddd() : ComponentWeekday {
  return {
    display: {
      config: {
        weekday: DATE_WEEKDAY_SHORT,
      }
    },
    type: COMPONENT_WEEKDAY,
  }
}