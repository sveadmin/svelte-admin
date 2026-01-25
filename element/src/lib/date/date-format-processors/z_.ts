import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_SHORT,
} from '../time-zone-types.js'

import type {
  TextDisplayPartTimeZone,
} from '../time-zone-types.js'

export function Z() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_SHORT,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}