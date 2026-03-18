import {
  COMPONENT_DAY,
  DATE_DAY_NUMERIC,
} from '../day-types.js'

import type {
  ComponentDay,
} from '../day-types.js'

export function d() : ComponentDay {
  return {
    display: {
      config: {
        day: DATE_DAY_NUMERIC,
      }
    },
    type: COMPONENT_DAY,
  }
}