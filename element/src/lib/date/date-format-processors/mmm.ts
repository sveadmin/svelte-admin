import {
  COMPONENT_MONTH,
  DATE_MONTH_SHORT,
} from '../month-types.js'

import type {
  ComponentMonth,
} from '../month-types.js'

export function mmm() : ComponentMonth {
  return {
    display: {
      config: {
        month: DATE_MONTH_SHORT,
      }
    },
    type: COMPONENT_MONTH,
  }
}