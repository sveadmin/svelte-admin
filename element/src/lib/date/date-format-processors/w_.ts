import {
  DATE_WEEK_NUMERIC,
  COMPONENT_WEEK,
} from '../week-types.js'

import type {
  ComponentWeek,
} from '../week-types.js'

export function W() : ComponentWeek {
  return {
    display: {
      config: {
        week: DATE_WEEK_NUMERIC,
      }
    },
    type: COMPONENT_WEEK,
  }
}