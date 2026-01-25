import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_LONG_OFFSET,
} from '../time-zone-types.js'

import type {
  TextDisplayPartTimeZone,
} from '../time-zone-types.js'

export function p() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_LONG_OFFSET,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}