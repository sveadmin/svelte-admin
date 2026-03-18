import {
  COMPONENT_MONTH,
  DATE_MONTH_2DIGIT,
} from '../month-types.js'

import type {
  ComponentMonth,
} from '../month-types.js'

export function mm() : ComponentMonth {
  return {
    display: {
      config: {
        month: DATE_MONTH_2DIGIT,
      }
    },
    type: COMPONENT_MONTH,
  }
}