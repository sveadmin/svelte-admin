import {
  TEXT_DISPLAY_TYPE_SECOND,
  TIME_SECOND_NUMERIC,
} from '../second-types.js'

import type {
  TextDisplayPartSecond,
} from '../second-types.js'

export function s() : TextDisplayPartSecond {
  return {
    options: {
      second: TIME_SECOND_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_SECOND,
  }
}