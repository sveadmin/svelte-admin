import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_SHORT_OFFSET,
} from '../time-zone-types.js'

import type {
  TextDisplayPartTimeZone,
} from '../time-zone-types.js'

export function o() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_SHORT_OFFSET,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}