import {
  COMPONENT_WEEKDAY,
  DATE_WEEKDAY_DELTA_LONG,
} from '../weekday-types.js'

import type {
  ComponentWeekday,
} from '../weekday-types.js'

export function DDDD() : ComponentWeekday {
  return {
    display: {
      config: {
        weekday: DATE_WEEKDAY_DELTA_LONG,
      },
    },
    type: COMPONENT_WEEKDAY,
  }
}