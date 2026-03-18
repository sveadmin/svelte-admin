import {
  COMPONENT_HOUR,
  TIME_HOUR_NUMERIC,
  TIME_HOUR_CYCLE_H23,
} from '../hour-types.js'

import type {
  ComponentHour,
} from '../hour-types.js'

export function H() : ComponentHour {
  return {
    display: {
      config: {
        hour: TIME_HOUR_NUMERIC,
        hourCycle: TIME_HOUR_CYCLE_H23,
      }
    },
    type: COMPONENT_HOUR,
  }
}