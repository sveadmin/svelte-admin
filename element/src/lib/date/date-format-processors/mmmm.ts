import {
  COMPONENT_MONTH,
  DATE_MONTH_LONG,
} from '../month-types.js'

import type {
  ComponentMonth,
} from '../month-types.js'

export function mmmm() : ComponentMonth {
  return {
    display: {
      config: {
        month: DATE_MONTH_LONG,
      }
    },
    type: COMPONENT_MONTH,
  }
}