import {
  DATE_WEEK_2DIGIT,
  COMPONENT_WEEK,
} from '../week-types.js'

import type {
  ComponentWeek,
} from '../week-types.js'

export function WW() : ComponentWeek {
  return {
    display: {
      config: {
        week: DATE_WEEK_2DIGIT,
      }
    },
    type: COMPONENT_WEEK,
  }
}