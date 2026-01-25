import {
  TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  TIME_ZONE_NAME_REGION,
} from '../time-zone-types.js'

import type {
  TextDisplayPartTimeZone,
} from '../time-zone-types.js'

export function ZZ() : TextDisplayPartTimeZone {
  return {
    options: {
      timeZoneName: TIME_ZONE_NAME_REGION,
    },
    type: TEXT_DISPLAY_TYPE_TIME_ZONE_NAME,
  }
}