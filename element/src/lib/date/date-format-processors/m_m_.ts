import {
  COMPONENT_MINUTE,
  TIME_MINUTE_2DIGIT,
} from '../minute-types.js'

import type {
  ComponentMinute,
} from '../minute-types.js'

export function MM() : ComponentMinute {
  return {
    display: {
      config: {
        minute: TIME_MINUTE_2DIGIT,
      }
    },
    type: COMPONENT_MINUTE,
  }
}