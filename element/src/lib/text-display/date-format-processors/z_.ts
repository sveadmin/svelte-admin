import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_SHORT,
} from '../types.js'

import type {
  TextDisplayPartTimeZone,
} from '../types.js'

export function Z() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}