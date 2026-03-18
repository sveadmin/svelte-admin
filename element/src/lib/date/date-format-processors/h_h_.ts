import {
  COMPONENT_HOUR,
  TIME_HOUR_2DIGIT,
  TIME_HOUR_CYCLE_H23,
} from '../hour-types.js'

import type {
  ComponentHour,
} from '../hour-types.js'

export function HH() : ComponentHour {
  return {
    display: {
      config: {
        hour: TIME_HOUR_2DIGIT,
        hourCycle: TIME_HOUR_CYCLE_H23,
      }
    },
    type: COMPONENT_HOUR,
  }
}