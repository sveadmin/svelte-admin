import {
  COMPONENT_WEEKDAY,
  DATE_WEEKDAY_LONG,
} from '../weekday-types.js'

import type {
  ComponentWeekday,
} from '../weekday-types.js'

export function dddd() : ComponentWeekday {
  return {
    display: {
      config: {
        weekday: DATE_WEEKDAY_LONG,
      }
    },
    type: COMPONENT_WEEKDAY,
  }
}