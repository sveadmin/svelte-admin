import {
  COMPONENT_YEAR,
  DATE_YEAR_2DIGIT,
} from '../year-types.js'

import type {
  ComponentYear,
} from '../year-types.js'

export function yy() : ComponentYear {
  return {
    display: {
      config: {
        year: DATE_YEAR_2DIGIT,
      }
    },
    type: COMPONENT_YEAR,
  }
}