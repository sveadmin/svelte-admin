import {
  TEXT_DISPLAY_TYPE_SECOND,
  TIME_SECOND_NUMERIC,
} from '../types.js'

import type {
  TextDisplayPartSecond,
} from '../types.js'

export function s() : TextDisplayPartSecond {
  return {
    options: {
      second: TIME_SECOND_NUMERIC,
    },
    type: TEXT_DISPLAY_TYPE_SECOND,
  }
}