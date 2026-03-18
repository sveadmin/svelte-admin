import {
  COMPONENT_MINUTE,
  TIME_MINUTE_NUMERIC,
} from '../minute-types.js'

import type {
  ComponentMinute,
} from '../minute-types.js'

export function M() : ComponentMinute {
  return {
    display: {
      config: {
        minute: TIME_MINUTE_NUMERIC,
      }
    },
    type: COMPONENT_MINUTE,
  }
}