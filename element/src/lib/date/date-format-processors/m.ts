import {
  COMPONENT_MONTH,
  DATE_MONTH_NUMERIC,
} from '../month-types.js'

import type {
  ComponentMonth,
} from '../month-types.js'

export function m() : ComponentMonth {
  return {
    display: {
      config: {
        month: DATE_MONTH_NUMERIC,
      }
    },
    type: COMPONENT_MONTH,
  }
}