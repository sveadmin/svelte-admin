import {
  TEXT_DISPLAY_TYPE_SECOND,
  TIME_SECOND_2DIGIT,
} from '../types.js'

import type {
  TextDisplayPartSecond,
} from '../types.js'

export function ss() : TextDisplayPartSecond {
  return {
    options: {
      second: TIME_SECOND_2DIGIT,
    },
    type: TEXT_DISPLAY_TYPE_SECOND,
  }
}