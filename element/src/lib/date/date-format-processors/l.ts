import {
  COMPONENT_FRACTIONAL_SECOND,
} from '../fractional-second-types.js'

import type {
  ComponentFractionalSecond,
} from '../fractional-second-types.js'

export function l() : ComponentFractionalSecond {
  return {
    display: {
      config: {
        fractionalSecondDigits: 3,
      }
    },
    type: COMPONENT_FRACTIONAL_SECOND,
  }
}