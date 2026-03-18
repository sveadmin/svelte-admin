import {
  COMPONENT_YEAR,
  DATE_YEAR_NUMERIC,
} from '../year-types.js'

import type {
  ComponentYear,
} from '../year-types.js'

export function yyyy() : ComponentYear {
  return {
    display: {
      config: {
        year: DATE_YEAR_NUMERIC,
      }
    },
    type: COMPONENT_YEAR,
  }
}