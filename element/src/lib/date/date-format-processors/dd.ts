import {
  COMPONENT_DAY,
  DATE_DAY_2DIGIT,
} from '../day-types.js'

import type {
  ComponentDay,
} from '../day-types.js'

export function dd() : ComponentDay {
  return {
    display: {
      config: {
        day: DATE_DAY_2DIGIT,
      }
    },
    type: COMPONENT_DAY,
  }
}