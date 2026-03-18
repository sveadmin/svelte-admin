import {
  COMPONENT_HOUR,
  TIME_HOUR_NUMERIC,
  TIME_HOUR_CYCLE_H12,
} from '../hour-types.js'

import type {
  ComponentHour,
} from '../hour-types.js'

export function h() : ComponentHour {
  return {
    display: {
      config: {
        hour: TIME_HOUR_NUMERIC,
        hourCycle: TIME_HOUR_CYCLE_H12,
      }
    },
    type: COMPONENT_HOUR,
  }
}