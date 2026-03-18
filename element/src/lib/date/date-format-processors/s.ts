import {
  COMPONENT_SECOND,
  TIME_SECOND_NUMERIC,
} from '../second-types.js'

import type {
  ComponentSecond,
} from '../second-types.js'

export function s() : ComponentSecond {
  return {
    display: {
      config: {
        second: TIME_SECOND_NUMERIC,
      }
    },
    type: COMPONENT_SECOND,
  }
}