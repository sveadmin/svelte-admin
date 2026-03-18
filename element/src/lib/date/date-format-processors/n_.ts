import {
  DATE_WEEKDAY_NUMERIC,
  COMPONENT_WEEKDAY,
} from '../weekday-types.js'

import type {
  ComponentWeekday,
} from '../weekday-types.js'

export function N() : ComponentWeekday {
  return {
    display: {
      config: {
        weekday: DATE_WEEKDAY_NUMERIC,
      }
    },
    type: COMPONENT_WEEKDAY,
  }
}