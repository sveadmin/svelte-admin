import {
  COMPONENT_HOUR,
  TIME_HOUR_2DIGIT,
  TIME_HOUR_CYCLE_H12,
} from '../hour-types.js'

import type {
  ComponentHour,
} from '../hour-types.js'

export function hh() : ComponentHour {
  return {
    display: {
      config: {
        hour: TIME_HOUR_2DIGIT,
        hourCycle: TIME_HOUR_CYCLE_H12,
      }
    },
    type: COMPONENT_HOUR,
  }
}