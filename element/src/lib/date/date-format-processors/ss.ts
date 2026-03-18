import {
  COMPONENT_SECOND,
  TIME_SECOND_2DIGIT,
} from '../second-types.js'

import type {
  ComponentSecond,
} from '../second-types.js'

export function ss() : ComponentSecond {
  return {
    display: {
      config: {
        second: TIME_SECOND_2DIGIT,
      }
    },
    type: COMPONENT_SECOND,
  }
}