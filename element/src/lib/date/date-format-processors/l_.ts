import {
  COMPONENT_FRACTIONAL_SECOND,
} from '../fractional-second-types.js'

import type {
  ComponentFractionalSecond,
} from '../fractional-second-types.js'

export function L() : ComponentFractionalSecond {
  return {
    display: {
      config: {
        fractionalSecondDigits: 2,
      }
    },
    type: COMPONENT_FRACTIONAL_SECOND,
  }
}