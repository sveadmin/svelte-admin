import {
  DATE_INTERVAL_NARROW,
  COMPONENT_INTERVAL,
} from '../interval-types.js'

import type {
  ComponentInterval,
} from '../interval-types.js'

export function i() : ComponentInterval {
  return {
    display: {
      config: {
        interval: DATE_INTERVAL_NARROW
      }
    },
    type: COMPONENT_INTERVAL,
  }
}